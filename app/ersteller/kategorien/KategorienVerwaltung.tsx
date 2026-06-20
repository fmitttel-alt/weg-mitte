"use client";

import { useState, useTransition } from "react";
import { kategorieAnlegen, kategorieLoeschen } from "./actions";

interface Rubrik {
  id: string;
  slug: string;
  name: string;
}

interface Kategorie {
  id: string;
  name: string;
  rubrik_id: string;
  rubriken: { slug: string; name: string } | null;
}

export default function KategorienVerwaltung({
  rubriken,
  kategorien,
}: {
  rubriken: Rubrik[];
  kategorien: Kategorie[];
}) {
  const [aktivRubrik, setAktivRubrik] = useState(rubriken[0]?.id ?? "");
  const [neuerName, setNeuerName] = useState("");
  const [isPending, startTransition] = useTransition();

  const gefiltertKategorien = kategorien.filter(
    (k) => k.rubrik_id === aktivRubrik
  );
  const aktivRubrikObj = rubriken.find((r) => r.id === aktivRubrik);

  function anlegen(e: React.FormEvent) {
    e.preventDefault();
    if (!neuerName.trim()) return;
    const data = new FormData();
    data.set("rubrik_id", aktivRubrik);
    data.set("name", neuerName.trim());
    startTransition(async () => {
      await kategorieAnlegen(data);
      setNeuerName("");
    });
  }

  function loeschen(id: string, name: string) {
    if (!confirm(`Kategorie "${name}" löschen? Zugeordnete Inhalte verlieren diese Kategorie.`))
      return;
    startTransition(() => kategorieLoeschen(id));
  }

  return (
    <div className="flex gap-8">
      {/* Rubrik-Auswahl links */}
      <div className="w-48 shrink-0">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Rubrik</p>
        <div className="flex flex-col gap-1">
          {rubriken.map((r) => (
            <button
              key={r.id}
              onClick={() => setAktivRubrik(r.id)}
              className={`text-left px-3 py-2 text-sm transition-colors ${
                aktivRubrik === r.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {r.name}
              <span className="ml-2 text-xs opacity-50">
                ({kategorien.filter((k) => k.rubrik_id === r.id).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Kategorien rechts */}
      <div className="flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
          Kategorien für {aktivRubrikObj?.name}
        </p>

        {/* Neue Kategorie */}
        <form onSubmit={anlegen} className="flex gap-2 mb-6">
          <input
            value={neuerName}
            onChange={(e) => setNeuerName(e.target.value)}
            placeholder="Neue Kategorie..."
            className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={isPending || !neuerName.trim()}
            className="px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-40 transition-colors"
          >
            + Hinzufügen
          </button>
        </form>

        {/* Liste */}
        {gefiltertKategorien.length === 0 ? (
          <p className="text-sm text-gray-400">Noch keine Kategorien für diese Rubrik.</p>
        ) : (
          <ul className="divide-y divide-gray-100 border border-gray-200">
            {gefiltertKategorien.map((k) => (
              <li
                key={k.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="text-sm">{k.name}</span>
                <button
                  onClick={() => loeschen(k.id, k.name)}
                  disabled={isPending}
                  className="text-xs text-red-400 hover:text-red-600 disabled:opacity-40"
                >
                  Löschen
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
