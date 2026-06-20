"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inhaltAnlegen } from "./actions";

interface Rubrik {
  id: string;
  slug: string;
  name: string;
}

const TYP_PRO_RUBRIK: Record<string, string[]> = {
  backen: ["artikel", "theorie"],
  gedichte: ["gedicht"],
  feuilleton: ["artikel"],
  existenziell: ["sonstiges"],
  radreise: ["artikel"],
};

export default function NeuerInhaltButton({ rubriken }: { rubriken: Rubrik[] }) {
  const [offen, setOffen] = useState(false);
  const [rubrikSlug, setRubrikSlug] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const typen =
    TYP_PRO_RUBRIK[rubrikSlug] ?? ["artikel", "gedicht", "theorie", "sonstiges"];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const id = await inhaltAnlegen(data);
      setOffen(false);
      router.push(`/ersteller/inhalte/${id}`);
    });
  }

  return (
    <>
      <button
        onClick={() => setOffen(true)}
        className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
      >
        + Neuer Inhalt
      </button>

      {offen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md p-6 shadow-xl">
            <h2 className="text-lg font-medium mb-4">Neuer Inhalt</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Titel</label>
                <input
                  name="titel"
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                  placeholder="Titel eingeben..."
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Rubrik</label>
                <select
                  name="rubrik_id"
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                  onChange={(e) => {
                    const slug = rubriken.find((r) => r.id === e.target.value)?.slug ?? "";
                    setRubrikSlug(slug);
                  }}
                >
                  <option value="">– Rubrik wählen –</option>
                  {rubriken.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Typ</label>
                <select
                  name="typ"
                  required
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                >
                  {typen.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-black text-white py-2 text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {isPending ? "Wird angelegt..." : "Anlegen & Bearbeiten"}
                </button>
                <button
                  type="button"
                  onClick={() => setOffen(false)}
                  className="px-4 py-2 text-sm border border-gray-300 hover:border-gray-500 transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
