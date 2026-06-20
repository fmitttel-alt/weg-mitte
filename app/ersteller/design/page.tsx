import { createServerClient } from "@/lib/supabase";
import BedeutungstextEditor from "./BedeutungstextEditor";

export const dynamic = "force-dynamic";

export default async function DesignPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("design_einstellungen")
    .select("wert")
    .eq("schluessel", "bedeutungstext")
    .single();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-light mb-6">Design & Texte</h1>
      <div className="mb-8">
        <h2 className="text-sm font-medium mb-1">Bedeutungstext (Startseite)</h2>
        <p className="text-xs text-gray-400 mb-4">
          Der erklärende Text unter dem Titel auf der Startseite.
        </p>
        <BedeutungstextEditor initialWert={data?.wert ?? ""} />
      </div>
    </div>
  );
}
