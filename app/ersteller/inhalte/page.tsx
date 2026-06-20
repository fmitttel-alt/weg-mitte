import { createServerClient } from "@/lib/supabase";
import Link from "next/link";
import NeuerInhaltButton from "./NeuerInhaltButton";

export const dynamic = "force-dynamic";

const RUBRIK_FARBEN: Record<string, string> = {
  radreise: "bg-blue-100 text-blue-800",
  backen: "bg-amber-100 text-amber-800",
  feuilleton: "bg-purple-100 text-purple-800",
  existenziell: "bg-red-100 text-red-800",
  gedichte: "bg-green-100 text-green-800",
};

export default async function InhaltePage({
  searchParams,
}: {
  searchParams: Promise<{ rubrik?: string }>;
}) {
  const { rubrik: rubrikFilter } = await searchParams;
  const supabase = createServerClient();

  const [{ data: rubriken }, { data: inhalte }] = await Promise.all([
    supabase.from("rubriken").select("id, slug, name").order("name"),
    supabase
      .from("inhalte")
      .select("id, titel, typ, erstellt_am, veroeffentlicht, rubrik_id, rubriken(slug, name)")
      .order("erstellt_am", { ascending: false })
      .limit(100),
  ]);

  const gefiltert = rubrikFilter
    ? inhalte?.filter((i: any) => i.rubriken?.slug === rubrikFilter)
    : inhalte;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light">Inhalte</h1>
        <NeuerInhaltButton rubriken={rubriken ?? []} />
      </div>

      {/* Rubrik-Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/ersteller/inhalte"
          className={`px-3 py-1 text-xs border transition-colors ${
            !rubrikFilter
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-gray-500"
          }`}
        >
          Alle
        </Link>
        {rubriken?.map((r: any) => (
          <Link
            key={r.slug}
            href={`/ersteller/inhalte?rubrik=${r.slug}`}
            className={`px-3 py-1 text-xs border transition-colors ${
              rubrikFilter === r.slug
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            {r.name}
          </Link>
        ))}
      </div>

      {/* Tabelle */}
      {!gefiltert || gefiltert.length === 0 ? (
        <p className="text-gray-400 text-sm">Noch keine Inhalte vorhanden.</p>
      ) : (
        <div className="border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-2 font-medium text-gray-600">Titel</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Rubrik</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Typ</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Datum</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {gefiltert.map((inhalt: any) => (
                <tr key={inhalt.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{inhalt.titel}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        RUBRIK_FARBEN[inhalt.rubriken?.slug] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inhalt.rubriken?.name ?? "–"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{inhalt.typ}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${
                        inhalt.veroeffentlicht
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {inhalt.veroeffentlicht ? "Veröffentlicht" : "Entwurf"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {inhalt.erstellt_am
                      ? new Date(inhalt.erstellt_am).toLocaleDateString("de-DE")
                      : "–"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/ersteller/inhalte/${inhalt.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Bearbeiten
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
