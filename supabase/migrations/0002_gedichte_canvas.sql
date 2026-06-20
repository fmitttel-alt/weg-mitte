-- ============================================================
-- Migration 0002: Gedichte-Canvas & Vorschau-Satz
-- ============================================================
-- Hintergrund: Jedes Gedicht ist individuell frei gestaltbar
-- (Canvas-System, vergleichbar mit Figma/Canva). Die Übersichts-
-- Vorschau zeigt Überschrift + einen manuell ausgewählten Satz,
-- der per Rechtsklick-Kontextmenü im Erstellerbereich festgelegt wird.
-- ============================================================

-- Felder direkt an der inhalte-Tabelle ergänzen
-- (Gedichte nutzen typ = 'gedicht', rubrik = gedichte)

alter table inhalte
  -- Der manuell ausgewählte Vorschau-Satz für die Übersichts-Kachel
  add column vorschau_satz text,

  -- Das freie Canvas-Layout als JSON (Positionen, Schriften, Farben, etc.)
  -- Null = noch nicht gestaltet / wird beim ersten Öffnen des Canvas-Editors befüllt
  add column canvas_layout jsonb;

-- Kategorie-Stimmungsbilder für Gedicht-Kategorien
-- (Ebene 3 der Gedichte-Navigation: Kategorien-Übersicht mit Stimmungsbild)
alter table kategorien
  add column stimmungsbild_pfad text;  -- Supabase Storage Pfad, nullable

-- Index für schnellen Zugriff auf Gedichte mit Vorschau-Satz
create index idx_inhalte_gedicht_vorschau
  on inhalte(rubrik_id)
  where typ = 'gedicht' and vorschau_satz is not null;
