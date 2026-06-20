import { createServerClient } from "@/lib/supabase";
import KategorienVerwaltung from "./KategorienVerwaltung";

export const dynamic = "force-dynamic";

export default async function KategorienPage() {
  const supabase = createServerClient();

  const [{ data: rubriken }, { data: kategorien }] = await Promise.all([
    supabase.from("rubriken").select("id, slug, name").order("name"),
    supabase
      .from("kategorien")
      .select("id, name, rubrik_id, rubriken!inner(slug, name)")
      .order("name"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-light mb-6">Kategorien</h1>
      <KategorienVerwaltung
        rubriken={rubriken ?? []}
        kategorien={(kategorien ?? []) as any}
      />
    </div>
  );
}
