// Handgezeichnete SVG-Symbole für die 5 Rubriken
// Stil: roter Stift, lockere Linienführung, runde Enden

const C = "#c0534a";
const S = { stroke: C, strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

// Radreise: nur Fahrrad, keine Berge (Berge sind das Ziel der Animation)
export function SymbolRadreise({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="58" r="18" {...S} strokeWidth={2.8} />
      <circle cx="62" cy="58" r="18" {...S} strokeWidth={2.8} />
      {/* Rahmen */}
      <line x1="28" y1="58" x2="45" y2="34" {...S} />
      <line x1="45" y1="34" x2="62" y2="58" {...S} />
      <line x1="45" y1="34" x2="45" y2="50" {...S} />
      <line x1="28" y1="58" x2="45" y2="50" {...S} />
      {/* Lenker */}
      <line x1="42" y1="34" x2="53" y2="30" {...S} />
      <line x1="53" y1="30" x2="57" y2="37" {...S} />
      {/* Sattel */}
      <line x1="39" y1="34" x2="34" y2="31" {...S} />
      <line x1="31" y1="30" x2="39" y2="30" {...S} />
      {/* Tretkurbel */}
      <circle cx="45" cy="50" r="3" {...S} strokeWidth={1.5} />
      <line x1="45" y1="53" x2="45" y2="60" {...S} strokeWidth={1.5} />
    </svg>
  );
}

export function SymbolFeuilleton({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="45" r="14" {...S} strokeWidth={2.8} />
      {/* 8 Strahlen */}
      <line x1="45" y1="8"  x2="45" y2="22" {...S} />
      <line x1="45" y1="68" x2="45" y2="82" {...S} />
      <line x1="8"  y1="45" x2="22" y2="45" {...S} />
      <line x1="68" y1="45" x2="82" y2="45" {...S} />
      <line x1="18" y1="18" x2="28" y2="28" {...S} />
      <line x1="62" y1="62" x2="72" y2="72" {...S} />
      <line x1="72" y1="18" x2="62" y2="28" {...S} />
      <line x1="18" y1="72" x2="28" y2="62" {...S} />
    </svg>
  );
}

export function SymbolBacten({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Ofenkorpus */}
      <rect x="12" y="35" width="66" height="44" rx="3" {...S} strokeWidth={2.5} />
      {/* Ofentür */}
      <rect x="22" y="44" width="46" height="28" rx="2" {...S} />
      {/* Türgriff */}
      <line x1="33" y1="58" x2="57" y2="58" {...S} strokeWidth={2} />
      {/* Herdplatten */}
      <ellipse cx="28" cy="30" rx="9" ry="4.5" {...S} />
      <ellipse cx="62" cy="30" rx="9" ry="4.5" {...S} />
      {/* Arbeitsplatte */}
      <line x1="8" y1="35" x2="82" y2="35" {...S} strokeWidth={2} />
      {/* Beine */}
      <line x1="22" y1="79" x2="22" y2="86" {...S} />
      <line x1="68" y1="79" x2="68" y2="86" {...S} />
    </svg>
  );
}

export function SymbolGedichte({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Stift-Körper */}
      <polygon points="35,12 55,12 60,72 30,72" {...S} strokeWidth={2.5} />
      {/* Spitze */}
      <polygon points="30,72 60,72 45,85" {...S} strokeWidth={2} />
      {/* Radiergummi */}
      <rect x="33" y="6" width="24" height="8" rx="2" {...S} />
      <line x1="33" y1="14" x2="57" y2="14" {...S} strokeWidth={1.5} />
      {/* Längslinie */}
      <line x1="45" y1="12" x2="45" y2="72" {...S} strokeWidth={1.2} />
    </svg>
  );
}

export function SymbolExistenziell({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Baumstamm */}
      <rect x="40" y="52" width="10" height="20" {...S} />
      {/* Baumkrone */}
      <ellipse cx="45" cy="38" rx="18" ry="20" {...S} strokeWidth={2.5} />
      {/* Axt-Stiel */}
      <line x1="14" y1="72" x2="38" y2="45" {...S} strokeWidth={2.5} />
      {/* Axt-Klinge */}
      <path d="M38,45 L48,38 L44,52 Z" {...S} strokeWidth={2} />
    </svg>
  );
}
