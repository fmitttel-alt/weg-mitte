import SurlyHeading from "@/components/SurlyHeading";

export default function FontPreviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16 space-y-16">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Radreise — Surly-Stil</p>
        <SurlyHeading as="h1" className="text-7xl text-black">Radreise</SurlyHeading>
        <SurlyHeading as="h2" className="text-5xl text-black mt-4">Auf dem Weg</SurlyHeading>
        <SurlyHeading as="h3" className="text-3xl text-black mt-4">ABCDEFGHIJKLMNOPQRSTUVWXYZ</SurlyHeading>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Backen — Du Pain et des Idées Stil</p>
        <h1 className="font-backen-heading text-6xl font-semibold text-black">Backen</h1>
        <h2 className="font-backen-heading text-4xl font-normal italic text-black mt-4">Rezepte & Theorie</h2>
        <p className="font-backen-heading text-2xl text-black mt-4 tracking-widest">DU PAIN &amp; DES IDÉES</p>
      </div>

      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Leitfarbe</p>
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded" style={{ background: "#e8847a" }} />
          <span className="text-sm font-mono text-gray-600">#e8847a — Terrakotta/Lachs (Surly Peach Salmon Sundae)</span>
        </div>
      </div>
    </div>
  );
}
