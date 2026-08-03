"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { submitLead } from "@/app/actions";
import type { LeadKind, LeadState } from "@/lib/validators";

const initialState: LeadState = { ok: false, message: "" };

export function LeadForm({
  kind,
  listing,
  submitLabel,
  className,
}: {
  kind: LeadKind;
  listing?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.ok) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (!state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const label =
    submitLabel ??
    (kind === "appraisal"
      ? "Request my free appraisal"
      : kind === "enquiry"
        ? "Send enquiry"
        : "Send message");

  return (
    <form ref={formRef} action={formAction} className={cn("space-y-4", className)}>
      <input type="hidden" name="kind" value={kind} />
      {listing ? <input type="hidden" name="listing" value={listing} /> : null}

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={state.errors?.name}>
          <Input name="name" required autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Phone" error={state.errors?.phone} optional>
          <Input name="phone" type="tel" autoComplete="tel" placeholder="Your phone" />
        </Field>
      </div>

      <Field label="Email" error={state.errors?.email}>
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </Field>

      {kind === "appraisal" ? (
        <Field label="Property address" error={state.errors?.address}>
          <Input name="address" autoComplete="street-address" placeholder="Address you'd like appraised" />
        </Field>
      ) : null}

      <Field
        label={kind === "appraisal" ? "Anything else? (optional)" : "Message"}
        error={state.errors?.message}
        optional={kind === "appraisal"}
      >
        <Textarea
          name="message"
          rows={4}
          placeholder={
            kind === "enquiry"
              ? "I'd like to know more about this property…"
              : "How can we help?"
          }
        />
      </Field>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full bg-teal px-6 text-base text-teal-foreground hover:bg-teal/90 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          label
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        ) : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
