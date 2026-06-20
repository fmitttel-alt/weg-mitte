"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const rubriken = [
  { href: "/radreise", label: "Radreise" },
  { href: "/backen", label: "Backen" },
  { href: "/feuilleton", label: "Feuilleton" },
  { href: "/existenziell", label: "Existenziell" },
  { href: "/gedichte", label: "Gedichte" },
];

export default function Navigation() {
  const pathname = usePathname();

  // Erstellerbereich hat eigene Navigation
  if (pathname.startsWith("/ersteller")) return null;

  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-lg">
          Weg-Mitte
        </Link>
        <div className="flex items-center gap-6">
          {rubriken.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`text-sm hover:text-black transition-colors ${
                pathname.startsWith(r.href)
                  ? "text-black font-medium"
                  : "text-gray-500"
              }`}
            >
              {r.label}
            </Link>
          ))}
          <Link
            href="/ersteller"
            className="text-sm text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1 rounded transition-colors"
          >
            Ersteller
          </Link>
        </div>
      </nav>
    </header>
  );
}
