import Link from "next/link";

const tabs = [
  { href: "/backen/videos", label: "Videos", primary: true },
  { href: "/backen/rezepte", label: "Rezepte" },
  { href: "/backen/theorie", label: "Theorie" },
];

export default function BackenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-8">Backen</h1>
      <nav className="flex gap-4 border-b border-gray-200 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`pb-3 text-sm border-b-2 border-transparent hover:border-gray-400 transition-colors ${
              t.primary ? "font-medium text-gray-800 hover:text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <p className="text-gray-400 italic">Platzhalter – Inhalte werden über den Erstellerbereich hinzugefügt.</p>
    </div>
  );
}
