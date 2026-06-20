import Link from "next/link";

const rubriken = [
  { href: "/radreise", label: "Radreise", beschreibung: "Videos, Videotagebuch, Fotoalben, Blog" },
  { href: "/backen", label: "Backen", beschreibung: "Videos, Rezepte, Sauerteig-Theorie" },
  { href: "/feuilleton", label: "Feuilleton", beschreibung: "Texte im Magazin-Stil" },
  { href: "/existenziell", label: "Existenziell", beschreibung: "Bilder, Texte, Sonstiges" },
  { href: "/gedichte", label: "Gedichte", beschreibung: "Sortiert nach Lebensabschnitt" },
];

// Bedeutungstext wird später aus der Datenbank geladen (design_einstellungen)
const BEDEUTUNGSTEXT =
  "Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende \"-te\" bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light tracking-tight mb-4">Weg-Mitte</h1>
      <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-16">
        {BEDEUTUNGSTEXT}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rubriken.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
          >
            <h2 className="font-medium text-lg mb-1 group-hover:text-black">{r.label}</h2>
            <p className="text-sm text-gray-500">{r.beschreibung}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
