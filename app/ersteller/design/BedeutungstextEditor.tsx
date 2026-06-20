"use client";

import { useState, useTransition } from "react";
import { bedeutungstextSpeichern } from "./actions";

export default function BedeutungstextEditor({ initialWert }: { initialWert: string }) {
  const [wert, setWert] = useState(initialWert);
  const [gespeichert, setGespeichert] = useState(false);
  const [isPending, startTransition] = useTransition();

  function speichern() {
    startTransition(async () => {
      await bedeutungstextSpeichern(wert);
      setGespeichert(true);
      setTimeout(() => setGespeichert(false), 2000);
    });
  }

  return (
    <div>
      <textarea
        value={wert}
        onChange={(e) => setWert(e.target.value)}
        rows={5}
        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black leading-relaxed resize-y"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={speichern}
          disabled={isPending}
          className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {gespeichert ? "✓ Gespeichert" : isPending ? "Speichert..." : "Speichern"}
        </button>
      </div>
    </div>
  );
}
