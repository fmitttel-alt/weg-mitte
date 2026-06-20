"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  SymbolRadreise,
  SymbolFeuilleton,
  SymbolBacten,
  SymbolGedichte,
  SymbolExistenziell,
} from "./RubrikSymbole";

type RubrikKey = "radreise" | "feuilleton" | "backen" | "gedichte" | "existenziell";

const POSITIONEN: {
  rubrik: RubrikKey;
  href: string;
  label: string;
  Symbol: React.ComponentType<{ size?: number }>;
  top: string;
  left: string;
  size: number;
}[] = [
  { rubrik: "radreise",    href: "/radreise",    label: "Radreise",    Symbol: SymbolRadreise,    top: "8%",  left: "42%", size: 100 },
  { rubrik: "backen",      href: "/backen",      label: "Backen",      Symbol: SymbolBacten,      top: "5%",  left: "10%", size: 88  },
  { rubrik: "feuilleton",  href: "/feuilleton",  label: "Feuilleton",  Symbol: SymbolFeuilleton,  top: "6%",  left: "72%", size: 82  },
  { rubrik: "gedichte",    href: "/gedichte",    label: "Gedichte",    Symbol: SymbolGedichte,    top: "52%", left: "74%", size: 78  },
  { rubrik: "existenziell",href: "/existenziell",label: "Existenziell",Symbol: SymbolExistenziell,top: "50%", left: "6%",  size: 96  },
];

// Overlay-Animationen pro Rubrik
const OVERLAYS: Record<RubrikKey, React.ReactNode> = {
  radreise: <RadreiseOverlay />,
  feuilleton: <FeuilletonOverlay />,
  backen: <BackenOverlay />,
  gedichte: <GedichteOverlay />,
  existenziell: <ExistenziellOverlay />,
};

export default function RubrikNavigation() {
  const [aktiv, setAktiv] = useState<RubrikKey | null>(null);
  const router = useRouter();

  const handleKlick = useCallback((rubrik: RubrikKey, href: string) => {
    setAktiv(rubrik);
    setTimeout(() => {
      router.push(href);
    }, 1200);
  }, [router]);

  return (
    <>
      {/* Animations-Overlay */}
      {aktiv && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          {OVERLAYS[aktiv]}
        </div>
      )}

      {/* Symbole */}
      <div className="flex-1 relative mx-auto w-full max-w-2xl" style={{ minHeight: "520px" }}>
        {POSITIONEN.map(({ rubrik, href, label, Symbol, top, left, size }) => (
          <button
            key={rubrik}
            onClick={() => handleKlick(rubrik, href)}
            className="absolute group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
            style={{ top, left, transform: "translate(-50%, 0)" }}
            disabled={aktiv !== null}
          >
            <div
              className={`transition-transform duration-200 ${
                aktiv === rubrik ? "scale-125" : "group-hover:scale-110"
              }`}
            >
              <Symbol size={size} />
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#c0534a" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Animationen ────────────────────────────────────────────────

function RadreiseOverlay() {
  return (
    <div className="animate-radreise">
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Berge im Hintergrund */}
        <polyline
          points="0,180 60,80 110,130 170,40 240,120 300,80 300,200 0,200"
          fill="#c0534a" fillOpacity="0.15" stroke="#c0534a" strokeWidth="2"
        />
        {/* Fahrrad fährt rein */}
        <g className="animate-bike">
          <circle cx="80" cy="150" r="18" fill="none" stroke="#c0534a" strokeWidth="2.5" />
          <circle cx="116" cy="150" r="18" fill="none" stroke="#c0534a" strokeWidth="2.5" />
          <line x1="80" y1="150" x2="98" y2="126" stroke="#c0534a" strokeWidth="2" />
          <line x1="98" y1="126" x2="116" y2="150" stroke="#c0534a" strokeWidth="2" />
        </g>
      </svg>
      <style>{`
        .animate-radreise { animation: fadeIn 0.3s ease; }
        .animate-bike { animation: bikeRide 1s ease-in forwards; transform-origin: center; }
        @keyframes bikeRide {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(60px) scale(0.3); opacity: 0; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function FeuilletonOverlay() {
  return (
    <div style={{ animation: "sunBurst 1.2s ease forwards" }}>
      <svg width="400" height="400" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="lightTunnel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffd8a8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c0534a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#lightTunnel)" style={{ animation: "expandSun 1.2s ease forwards" }} />
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <line
            key={i}
            x1="200" y1="200"
            x2={200 + Math.cos(deg * Math.PI / 180) * 200}
            y2={200 + Math.sin(deg * Math.PI / 180) * 200}
            stroke="#c0534a" strokeWidth="2" opacity="0.4"
            style={{ animation: `expandSun 1.2s ease ${i * 0.05}s forwards` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes expandSun {
          0% { transform: scale(0.1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function BackenOverlay() {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Ofen */}
        <rect x="30" y="60" width="140" height="110" rx="3" fill="none" stroke="#c0534a" strokeWidth="2.5" />
        {/* Tür öffnet sich nach links */}
        <rect
          x="50" y="75"
          width="90" height="80"
          rx="2" fill="none" stroke="#c0534a" strokeWidth="2"
          style={{ animation: "openDoor 0.8s ease 0.3s forwards", transformOrigin: "50px 115px" }}
        />
        {/* Leuchten aus dem Ofen */}
        <ellipse cx="100" cy="115" rx="35" ry="30"
          fill="#c0534a" fillOpacity="0"
          style={{ animation: "ovenGlow 0.6s ease 0.8s forwards" }}
        />
      </svg>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes openDoor {
          0% { transform: perspective(200px) rotateY(0deg); }
          100% { transform: perspective(200px) rotateY(-75deg); opacity: 0.3; }
        }
        @keyframes ovenGlow {
          0% { fill-opacity: 0; }
          50% { fill-opacity: 0.4; }
          100% { fill-opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function GedichteOverlay() {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <svg width="280" height="160" viewBox="0 0 280 160">
        {/* Stift */}
        <g style={{ animation: "penMove 0.6s ease forwards" }}>
          <polygon points="120,10 134,10 138,50 116,50" fill="none" stroke="#c0534a" strokeWidth="2" />
          <polygon points="116,50 138,50 127,60" fill="none" stroke="#c0534a" strokeWidth="2" />
        </g>
        {/* Handschrift erscheint */}
        <text
          x="20" y="110"
          fontFamily="cursive" fontSize="36" fill="none"
          stroke="#c0534a" strokeWidth="1.5"
          style={{
            animation: "writeText 0.8s ease 0.5s forwards",
            strokeDasharray: "200",
            strokeDashoffset: "200",
          }}
        >
          Gedichte
        </text>
      </svg>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes penMove {
          0% { transform: translate(80px, 30px); }
          100% { transform: translate(200px, 80px); }
        }
        @keyframes writeText {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function ExistenziellOverlay() {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <svg width="240" height="200" viewBox="0 0 240 200">
        {/* Baum fällt */}
        <g style={{ animation: "treeFall 0.6s ease 0.2s forwards", transformOrigin: "120px 160px" }}>
          <rect x="113" y="100" width="14" height="60" fill="none" stroke="#c0534a" strokeWidth="2" />
          <ellipse cx="120" cy="80" rx="28" ry="30" fill="none" stroke="#c0534a" strokeWidth="2" />
        </g>
        {/* Holzhütte erscheint */}
        <g style={{ opacity: 0, animation: "hutteIn 0.5s ease 0.9s forwards" }}>
          <polygon points="120,50 180,90 180,160 60,160 60,90" fill="none" stroke="#c0534a" strokeWidth="2.5" />
          <polyline points="46,92 120,44 194,92" fill="none" stroke="#c0534a" strokeWidth="2.8" />
          <rect x="100" y="120" width="40" height="40" fill="none" stroke="#c0534a" strokeWidth="2" />
        </g>
        {/* Axt-Schlag */}
        <g style={{ animation: "axeSwing 0.4s ease forwards", transformOrigin: "60px 140px" }}>
          <line x1="40" y1="170" x2="100" y2="100" stroke="#c0534a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M100,100 L118,88 L112,108 Z" fill="none" stroke="#c0534a" strokeWidth="2" />
        </g>
      </svg>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes treeFall {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(80deg); opacity: 0; }
        }
        @keyframes hutteIn {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes axeSwing {
          0% { transform: rotate(-30deg); }
          60% { transform: rotate(15deg); }
          100% { transform: rotate(0deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
