"use client";

import { useState } from "react";
import { Sparkles, Send, AlertCircle } from "lucide-react";

export function ForumForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!prompt.trim()) {
      setError("Escribe tu petición");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/forum/submit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar la petición");
      }

      setSuccess(true);
      setPrompt("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Petición a Noxis IA</h3>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="¿Qué tema de IA o tecnología quieres que analice?"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
        rows={3}
        disabled={loading}
      />

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-400/10 p-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="mt-3 rounded-lg bg-emerald-400/10 p-3 text-sm text-emerald-300">
          ✓ Petición enviada. Se mostrará en el foro en unos momentos.
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Send className="h-4 w-4" />
          {loading ? "Enviando..." : "Enviar petición"}
        </button>
      </div>
    </form>
  );
}
