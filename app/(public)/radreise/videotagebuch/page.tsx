export default function RadreiseVideotagebuchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-light mb-6">Videotagebuch</h2>
      <div className="flex gap-3 mb-8">
        <button className="px-4 py-2 text-sm border border-gray-300 hover:border-gray-500 transition-colors">3D-Globus</button>
        <button className="px-4 py-2 text-sm border border-gray-300 hover:border-gray-500 transition-colors">Zeitlich</button>
        <button className="px-4 py-2 text-sm border border-gray-300 hover:border-gray-500 transition-colors">Nach Klickzahl</button>
      </div>
      <p className="text-gray-400 italic">Platzhalter – Strecken und Videos werden über den Erstellerbereich hinzugefügt.</p>
    </div>
  );
}
