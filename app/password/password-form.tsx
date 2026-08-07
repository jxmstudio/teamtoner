"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { unlockSite, type UnlockState } from "./actions";

const initialState: UnlockState = {};

export function PasswordForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(unlockSite, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div className="space-y-2 text-left">
        <Label htmlFor="password" className="text-white/80">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Enter password"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
          className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/40"
        />
        {state.error ? (
          <p id="password-error" role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full bg-teal text-teal-foreground hover:bg-teal/90"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Checking…
          </>
        ) : (
          <>
            <Lock />
            Enter site
          </>
        )}
      </Button>
    </form>
  );
}
