import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import {
  SymbolRadreise,
  SymbolFeuilleton,
  SymbolBacten,
  SymbolGedichte,
  SymbolExistenziell,
} from "@/components/RubrikSymbole";

export const dynamic = "force-dynamic";

const FALLBACK_TEXT =
  "Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende \"-te\" bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.";

// Lockere Positionen der 5 Symbole (top/left in %)
const POSITIONEN = [
  { rubrik: "radreise",    href: "/radreise",    label: "Radreise",    Symbol: SymbolRadreise,    top: "8%",  left: "38%", size: 100 },
  { rubrik: "backen",      href: "/backen",      label: "Backen",      Symbol: SymbolBacten,      top: "5%",  left: "8%",  size: 88  },
  { rubrik: "feuilleton",  href: "/feuilleton",  label: "Feuilleton",  Symbol: SymbolFeuilleton,  top: "6%",  left: "70%", size: 82  },
  { rubrik: "gedichte",    href: "/gedichte",    label: "Gedichte",    Symbol: SymbolGedichte,    top: "52%", left: "72%", size: 78  },
  { rubrik: "existenziell",href: "/existenziell",label: "Existenziell",Symbol: SymbolExistenziell,top: "50%", left: "5%",  size: 96  },
];

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
      {/* Bedeutungstext */}
      <div className="max-w-xl mx-auto px-8 pt-12 pb-6 text-center">
        <p className="text-gray-500 text-sm leading-relaxed">{bedeutungstext}</p>
      </div>

      {/* Symbolfeld */}
      <div className="flex-1 relative mx-auto w-full max-w-2xl" style={{ minHeight: "520px" }}>
        {POSITIONEN.map(({ rubrik, href, label, Symbol, top, left, size }) => (
          <Link
            key={rubrik}
            href={href}
            className="absolute group flex flex-col items-center gap-2"
            style={{ top, left, transform: "translate(-50%, 0)" }}
          >
            <div className="transition-transform group-hover:scale-110 duration-200">
              <Symbol size={size} />
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c0534a", fontFamily: "sans-serif" }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
