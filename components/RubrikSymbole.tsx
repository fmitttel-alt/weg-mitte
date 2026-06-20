// Handgezeichnete SVG-Symbole für die 5 Rubriken
// Stil: roter Stift, lockere Linienführung, runde Enden

const STIFT_FARBE = "#c0534a";
const STRICH = { stroke: STIFT_FARBE, strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

export function SymbolRadreise({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Berge */}
      <polyline points="5,72 22,42 36,58 52,32 70,72" {...STRICH} strokeWidth={2.2} />
      {/* Fahrrad-Rahmen */}
      <circle cx="32" cy="65" r="11" {...STRICH} strokeWidth={2.5} />
      <circle cx="60" cy="65" r="11" {...STRICH} strokeWidth={2.5} />
      <line x1="32" y1="65" x2="46" y2="47" {...STRICH} />
      <line x1="46" y1="47" x2="60" y2="65" {...STRICH} />
      <line x1="46" y1="47" x2="46" y2="58" {...STRICH} />
      <line x1="32" y1="65" x2="46" y2="58" {...STRICH} />
      {/* Lenker */}
      <line x1="43" y1="47" x2="52" y2="44" {...STRICH} />
      <line x1="52" y1="44" x2="55" y2="49" {...STRICH} />
      {/* Sattel */}
      <line x1="40" y1="47" x2="36" y2="45" {...STRICH} />
      <line x1="34" y1="44" x2="40" y2="44" {...STRICH} />
    </svg>
  );
}

export function SymbolFeuilleton({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Sonne: Kreis */}
      <circle cx="45" cy="45" r="16" {...STRICH} strokeWidth={2.8} />
      {/* Strahlen */}
      <line x1="45" y1="10" x2="45" y2="22" {...STRICH} />
      <line x1="45" y1="68" x2="45" y2="80" {...STRICH} />
      <line x1="10" y1="45" x2="22" y2="45" {...STRICH} />
      <line x1="68" y1="45" x2="80" y2="45" {...STRICH} />
      <line x1="20" y1="20" x2="29" y2="29" {...STRICH} />
      <line x1="61" y1="61" x2="70" y2="70" {...STRICH} />
      <line x1="70" y1="20" x2="61" y2="29" {...STRICH} />
      <line x1="20" y1="70" x2="29" y2="61" {...STRICH} />
    </svg>
  );
}

export function SymbolBacten({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Ofenkorpus */}
      <rect x="18" y="38" width="54" height="38" rx="3" {...STRICH} strokeWidth={2.5} />
      {/* Backofentür */}
      <rect x="28" y="48" width="34" height="22" rx="2" {...STRICH} />
      {/* Türgriff */}
      <line x1="37" y1="59" x2="53" y2="59" {...STRICH} strokeWidth={2} />
      {/* Herdplatten oben */}
      <ellipse cx="30" cy="35" rx="8" ry="4" {...STRICH} />
      <ellipse cx="60" cy="35" rx="8" ry="4" {...STRICH} />
      {/* Arbeitsplatte */}
      <line x1="14" y1="38" x2="76" y2="38" {...STRICH} strokeWidth={2} />
      {/* Beine */}
      <line x1="25" y1="76" x2="25" y2="82" {...STRICH} />
      <line x1="65" y1="76" x2="65" y2="82" {...STRICH} />
    </svg>
  );
}

export function SymbolGedichte({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Stift-Körper */}
      <polygon
        points="38,15 52,15 56,70 34,70"
        {...STRICH}
        strokeWidth={2.5}
      />
      {/* Spitze */}
      <polygon points="34,70 56,70 45,82" {...STRICH} strokeWidth={2} />
      {/* Radiergummi oben */}
      <rect x="36" y="10" width="18" height="7" rx="2" {...STRICH} />
      {/* Linie am Radiergummi */}
      <line x1="36" y1="17" x2="54" y2="17" {...STRICH} strokeWidth={1.5} />
      {/* Längsstreifen */}
      <line x1="45" y1="15" x2="45" y2="70" {...STRICH} strokeWidth={1.2} />
    </svg>
  );
}

export function SymbolExistenziell({ size = 90 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      {/* Hüttenwände */}
      <polygon points="45,18 78,42 78,78 12,78 12,42" {...STRICH} strokeWidth={2.5} />
      {/* Dach */}
      <polyline points="6,44 45,12 84,44" {...STRICH} strokeWidth={2.8} />
      {/* Tür */}
      <rect x="36" y="55" width="18" height="23" rx="1" {...STRICH} />
      {/* Türknauf */}
      <circle cx="50" cy="67" r="1.5" {...STRICH} strokeWidth={1.5} />
      {/* Fenster */}
      <rect x="18" y="50" width="14" height="12" rx="1" {...STRICH} />
      <line x1="25" y1="50" x2="25" y2="62" {...STRICH} strokeWidth={1.2} />
      <line x1="18" y1="56" x2="32" y2="56" {...STRICH} strokeWidth={1.2} />
      {/* Schornstein */}
      <rect x="58" y="18" width="8" height="18" {...STRICH} />
    </svg>
  );
}
