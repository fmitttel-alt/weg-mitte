import Link from "next/link";

const tabs = [
  { href: "/radreise/videos", label: "Videos" },
  { href: "/radreise/videotagebuch", label: "Videotagebuch" },
  { href: "/radreise/fotoalben", label: "Fotoalben" },
  { href: "/radreise/blog", label: "Blog" },
];

export default function RadreisePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-8">Radreise</h1>
      <nav className="flex gap-4 border-b border-gray-200 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="pb-3 text-sm text-gray-500 hover:text-black border-b-2 border-transparent hover:border-gray-400 transition-colors"
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <p className="text-gray-400 italic">Platzhalter – Inhalte werden über den Erstellerbereich hinzugefügt.</p>
    </div>
  );
}
