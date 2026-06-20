import { createServerClient } from "@/lib/supabase";
import RubrikNavigation from "@/components/RubrikNavigation";

export const dynamic = "force-dynamic";

const FALLBACK_TEXT =
  "Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende \"-te\" bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.";

export default async function HomePage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("design_einstellungen")
    .select("wert")
    .eq("schluessel", "bedeutungstext")
    .single();

  const bedeutungstext = data?.wert ?? FALLBACK_TEXT;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-xl mx-auto px-8 pt-12 pb-6 text-center">
        <p className="text-gray-500 text-sm leading-relaxed">{bedeutungstext}</p>
      </div>
      <RubrikNavigation />
    </div>
  );
}
