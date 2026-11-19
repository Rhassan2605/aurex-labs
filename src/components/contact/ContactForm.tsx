"use client";

import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Info, LoaderCircle, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  budgetOptions,
  contactSchema,
  fieldErrorsFrom,
  serviceOptions,
  timelineOptions,
  type ContactField,
  type FieldErrors,
} from "@/lib/validation";
import { mailtoHref, site, whatsappHref } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 text-pearl placeholder:text-mist/60 transition-[border-color,background,box-shadow] duration-300 outline-none focus:border-lavender/70 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(144,101,248,0.15)]";

export function ContactForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const uid = useId();
  const id = (field: string) => `${idPrefix}-${uid}-${field}`;

  useEffect(() => {
    startedAt.current = Date.now();
    // Pre-select a service from ?service=… (links on service cards).
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && serviceRef.current && (serviceOptions as readonly string[]).includes(requested)) {
      serviceRef.current.value = requested;
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFrom(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      const first = Object.keys(fieldErrors)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors };
      if (!res.ok || !body.ok) {
        setErrors(body.fieldErrors ?? {});
        setStatus("error");
        setMessage(body.error || "Something went wrong. Please try again.");
        window.turnstile?.reset();
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error — please check your connection and try again.");
    }
  }

  function resetForm() {
    setStatus("idle");
    setMessage("");
    startedAt.current = Date.now();
    window.turnstile?.reset();
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input[name=name]")?.focus());
  }

  const wa = whatsappHref();
  const mail = mailtoHref();
  const fieldProps = (field: ContactField) => ({
    id: id(field),
    name: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? id(`${field}-error`) : undefined,
    onChange: () => errors[field] && setErrors((e) => ({ ...e, [field]: undefined })),
  });

  return (
    <div className="relative">
      {TURNSTILE_SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-lavender/25 bg-electric/[0.06] p-10 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-electric text-white shadow-[0_0_40px_rgba(144,101,248,0.7)]">
              <Check aria-hidden className="h-7 w-7" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-pearl">Message received.</h3>
            <p className="mt-3 max-w-sm text-mist">
              Thank you for reaching out. We read every inquiry personally and will reply to the email you provided.
            </p>
            <button type="button" onClick={resetForm} className={buttonClasses("secondary", "md", "mt-8")}>
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-describedby={message ? id("status") : undefined}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" htmlFor={id("name")} error={errors.name} errorId={id("name-error")} required>
                <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={80} className={cn(inputBase, "h-12", errors.name ? "border-red-400/70" : "border-line-strong")} placeholder="Jane Doe" />
              </Field>
              <Field label="Email" htmlFor={id("email")} error={errors.email} errorId={id("email-error")} required>
                <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required maxLength={160} className={cn(inputBase, "h-12", errors.email ? "border-red-400/70" : "border-line-strong")} placeholder="jane@company.com" />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company or project" htmlFor={id("company")} error={errors.company} errorId={id("company-error")} optional>
                <input {...fieldProps("company")} type="text" autoComplete="organization" maxLength={120} className={cn(inputBase, "h-12", "border-line-strong")} placeholder="Optional" />
              </Field>
              <Field label="Service" htmlFor={id("service")} error={errors.service} errorId={id("service-error")} required>
                <Select {...fieldProps("service")} ref={serviceRef} defaultValue="" invalid={!!errors.service}>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Budget" htmlFor={id("budget")} optional>
                <Select {...fieldProps("budget")} defaultValue={budgetOptions[0]}>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Timeline" htmlFor={id("timeline")} optional>
                <Select {...fieldProps("timeline")} defaultValue={timelineOptions[0]}>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <Field label="Tell us about your project" htmlFor={id("message")} error={errors.message} errorId={id("message-error")} required>
              <textarea {...fieldProps("message")} required rows={5} maxLength={4000} className={cn(inputBase, "resize-y py-3 leading-relaxed", errors.message ? "border-red-400/70" : "border-line-strong")} placeholder="Goals, audience, scope, links to anything that helps…" />
            </Field>

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={id("website")}>Leave this field empty</label>
              <input id={id("website")} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />}

            <div id={id("status")} aria-live="polite" className="min-h-0">
              {status === "error" && message && (
                <div role="alert" className="flex gap-3 rounded-xl border border-red-400/30 bg-red-400/[0.07] p-4 text-sm text-red-100">
                  <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p>{message}</p>
                    {(wa || mail) && Object.keys(errors).length === 0 && (
                      <p className="mt-1 text-red-100/80">
                        You can also reach us{" "}
                        {mail && (
                          <a className="underline underline-offset-2" href={mail}>
                            by email
                          </a>
                        )}
                        {mail && wa && " or "}
                        {wa && (
                          <a className="underline underline-offset-2" href={wa} target="_blank" rel="noopener noreferrer">
                            on WhatsApp
                          </a>
                        )}
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-mist">
                By sending, you agree to our{" "}
                <Link href="/privacy" className="text-pearl underline underline-offset-2 hover:text-lavender">
                  Privacy Policy
                </Link>
                . We never share your details.
              </p>
              <button type="submit" disabled={status === "submitting"} className={buttonClasses("primary", "lg", "shrink-0")}>
                {status === "submitting" ? (
                  <>
                    <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send inquiry
                    <Send aria-hidden className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            <span className="sr-only" aria-live="assertive">
              {status === "submitting" ? `Sending your message to ${site.name}` : ""}
            </span>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-pearl">
        <span>
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-lavender">
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-normal text-mist">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Select({
  invalid,
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        ref={ref}
        {...props}
        className={cn(
          inputBase,
          "h-12 cursor-pointer appearance-none pr-10 [&>option]:bg-graphite [&>option]:text-pearl",
          invalid ? "border-red-400/70" : "border-line-strong",
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
    </div>
  );
}
