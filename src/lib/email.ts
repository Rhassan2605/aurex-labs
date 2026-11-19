import "server-only";
import type { ContactInput } from "@/lib/validation";

/**
 * Configurable email delivery for inquiries.
 *
 * EMAIL_PROVIDER = "resend" | "smtp" | "console"
 *  - resend  → RESEND_API_KEY
 *  - smtp    → SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
 *  - console → logs the inquiry (development only; refused in production)
 *
 * Always requires CONTACT_TO_EMAIL (where inquiries go) and CONTACT_FROM_EMAIL
 * (a sender on a domain you have verified with the provider).
 */

export class EmailNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmailNotConfiguredError";
  }
}

type Mail = { to: string; from: string; replyTo: string; subject: string; text: string; html: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildMail(input: ContactInput, meta: { ip: string; userAgent: string }): Omit<Mail, "to" | "from"> {
  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Service", input.service],
    ["Budget", input.budget],
    ["Timeline", input.timeline],
  ];
  const subject = stripNewlines(`New inquiry: ${input.service} — ${input.name}`).slice(0, 180);
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    input.message,
    "",
    `— Sent from the AUREX LABS website (${meta.ip}, ${meta.userAgent})`,
  ].join("\n");
  const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;background:#f5f3fa;padding:24px;color:#090a0f">
<table role="presentation" style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:28px">
<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#9065f8">NEW PROJECT INQUIRY</p>
<h1 style="margin:0 0 20px;font-size:20px">${escapeHtml(input.service)} — ${escapeHtml(input.name)}</h1>
<table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 0;color:#6b6880;width:110px">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
  )
  .join("")}
</table>
<p style="margin:20px 0 6px;color:#6b6880;font-size:14px">Message</p>
<p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(input.message)}</p>
<p style="margin:24px 0 0;font-size:12px;color:#9a97ab">Reply directly to this email to respond to ${escapeHtml(input.name)}.</p>
</td></tr></table></body></html>`;
  return { replyTo: input.email, subject, text, html };
}

async function sendWithResend(mail: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailNotConfiguredError("RESEND_API_KEY is not set.");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: mail.from,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

async function sendWithSmtp(mail: Mail): Promise<void> {
  const host = process.env.SMTP_HOST;
  if (!host) throw new EmailNotConfiguredError("SMTP_HOST is not set.");
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000,
  });
  await transporter.sendMail(mail);
}

export async function sendInquiry(input: ContactInput, meta: { ip: string; userAgent: string }): Promise<void> {
  const provider = (process.env.EMAIL_PROVIDER || "console").toLowerCase();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const content = buildMail(input, meta);

  if (provider === "console") {
    if (process.env.NODE_ENV === "production") {
      throw new EmailNotConfiguredError("EMAIL_PROVIDER is 'console' in production. Configure resend or smtp.");
    }
    console.info("\n[contact] New inquiry (console provider — not emailed)\n" + content.text + "\n");
    return;
  }

  if (!to || !from) throw new EmailNotConfiguredError("CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must be set.");
  const mail: Mail = { ...content, to, from };

  if (provider === "resend") return sendWithResend(mail);
  if (provider === "smtp") return sendWithSmtp(mail);
  throw new EmailNotConfiguredError(`Unknown EMAIL_PROVIDER "${provider}".`);
}
