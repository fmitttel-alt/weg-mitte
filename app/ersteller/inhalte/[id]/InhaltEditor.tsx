"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inhaltSpeichern, inhaltLoeschen } from "../actions";

interface Inhalt {
  id: string;
  titel: string;
  text: string | null;
  typ: string;
  veroeffentlicht: boolean;
  rubriken: { slug: string; name: string } | null;
}

export default function InhaltEditor({ inhalt }: { inhalt: Inhalt }) {
  const [titel, setTitel] = useState(inhalt.titel);
  const [text, setText] = useState(inhalt.text ?? "");
  const [veroeffentlicht, setVeroeffentlicht] = useState(inhalt.veroeffentlicht);
  const [gespeichert, setGespeichert] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function speichern() {
    const data = new FormData();
    data.set("titel", titel);
    data.set("text", text);
    data.set("veroeffentlicht", String(veroeffentlicht));
    startTransition(async () => {
      await inhaltSpeichern(inhalt.id, data);
      setGespeichert(true);
      setTimeout(() => setGespeichert(false), 2000);
    });
  }

  function loeschen() {
    if (!confirm(`"${titel}" wirklich löschen?`)) return;
    startTransition(async () => {
      await inhaltLoeschen(inhalt.id);
      router.push("/ersteller/inhalte");
    });
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              {inhalt.rubriken?.name} · {inhalt.typ}
            </span>
          </div>
          <input
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            className="text-2xl font-light w-full border-0 border-b border-gray-200 focus:outline-none focus:border-black pb-1 bg-transparent"
            placeholder="Titel..."
          />
        </div>

        <div className="flex items-center gap-3 pt-6 shrink-0">
          <button
            onClick={loeschen}
            disabled={isPending}
            className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40"
          >
            Löschen
          </button>
          <button
            onClick={speichern}
            disabled={isPending}
            className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {gespeichert ? "✓ Gespeichert" : isPending ? "Speichert..." : "Speichern"}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 border border-gray-200">
        <span className="text-xs text-gray-500">Status:</span>
        <button
          onClick={() => setVeroeffentlicht(!veroeffentlicht)}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            veroeffentlicht
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {veroeffentlicht ? "✓ Veröffentlicht" : "Entwurf"}
        </button>
        <span className="text-xs text-gray-400">
          {veroeffentlicht
            ? "Sichtbar auf der Website"
            : "Noch nicht öffentlich — nach Speichern aktiv"}
        </span>
      </div>

      {/* Textfeld */}
      <div>
        <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">
          Text / Inhalt
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={20}
          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black font-mono leading-relaxed resize-y"
          placeholder="Inhalt hier eingeben (Markdown wird unterstützt)..."
        />
        <p className="text-xs text-gray-400 mt-1">
          Markdown wird unterstützt: **fett**, *kursiv*, # Überschrift
        </p>
      </div>
    </div>
  );
}
