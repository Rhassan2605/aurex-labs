import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, fieldErrorsFrom } from "@/lib/validation";
import { sendInquiry, EmailNotConfiguredError } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

const MIN_FILL_MS = 3_000; // humans take longer than this to complete the form
const MAX_BODY_BYTES = 20_000;

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}

function json(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { ok: false, error: "Request origin not allowed." });

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Submission is too large." });

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
    if (!payload || typeof payload !== "object") throw new Error("Invalid body");
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  // Spam trap 1: honeypot field that humans never see.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json(200, { ok: true });
  }
  // Spam trap 2: submitted implausibly fast.
  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return json(200, { ok: true });
  }

  const ip = clientIp(req);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return json(
      429,
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { "Retry-After": String(limited.retryAfter) },
    );
  }

  const human = await verifyTurnstile(
    typeof payload["cf-turnstile-response"] === "string" ? payload["cf-turnstile-response"] : undefined,
    ip,
  );
  if (!human) return json(400, { ok: false, error: "Verification failed. Please refresh and try again." });

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(422, {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    });
  }

  try {
    await sendInquiry(parsed.data, { ip, userAgent: (req.headers.get("user-agent") || "unknown").slice(0, 200) });
    return json(200, { ok: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    if (error instanceof EmailNotConfiguredError) {
      return json(503, { ok: false, error: "Our inbox is temporarily unavailable. Please reach us directly instead." });
    }
    return json(502, { ok: false, error: "We couldn't send your message right now. Please try again shortly." });
  }
}
