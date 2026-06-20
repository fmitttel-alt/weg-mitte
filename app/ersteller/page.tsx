import Link from "next/link";

const bereiche = [
  { href: "/ersteller/inhalte", label: "Inhalte verwalten", desc: "Texte, Videos, Bilder hochladen und bearbeiten" },
  { href: "/ersteller/kategorien", label: "Kategorien & Sortierung", desc: "Kategorien und Sortiermodi pro Rubrik verwalten" },
  { href: "/ersteller/rezepte", label: "Rezepte", desc: "Backen-Rezepte mit Rezeptrechner anlegen" },
  { href: "/ersteller/plattformen", label: "Plattform-Anbindungen", desc: "YouTube, Instagram, TikTok, Vimeo verknüpfen" },
  { href: "/ersteller/design", label: "Design & Bilder", desc: "Hintergrundbilder pro Rubrik austauschen" },
];

export default function ErstellerPage() {
  return (
    <div>
      <h1 className="text-2xl font-light mb-8">Übersicht</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bereiche.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className="bg-white border border-gray-200 p-5 hover:border-gray-400 transition-colors"
          >
            <h2 className="font-medium text-sm mb-1">{b.label}</h2>
            <p className="text-xs text-gray-500">{b.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
