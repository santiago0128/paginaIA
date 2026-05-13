"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Algo salió mal. Intenta de nuevo.");
        setState("error");
      } else {
        setState("success");
        setEmail("");
      }
    } catch {
      setErrorMsg("Error de red. Intenta de nuevo.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p className="text-sm font-medium text-cyan-400">
        ¡Listo! Te avisamos cuando haya novedades.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "loading"}
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
      >
        {state === "loading" ? "Enviando…" : "Suscribirme"}
        {state !== "loading" && <ArrowRight className="h-4 w-4" />}
      </button>
      {state === "error" && (
        <p className="text-xs text-red-400 sm:col-span-2">{errorMsg}</p>
      )}
    </form>
  );
}
