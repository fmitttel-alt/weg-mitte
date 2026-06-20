-- ============================================================
-- Weg-Mitte: Initiales Datenbankschema
-- Supabase / Postgres
-- ============================================================

-- Aktiviere UUID-Erweiterung
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. RUBRIKEN (fest vordefiniert, nicht vom Nutzer editierbar)
-- ============================================================
create table rubriken (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  name       text not null,
  beschreibung text
);

insert into rubriken (slug, name, beschreibung) values
  ('radreise',    'Radreise',    'Videos, Videotagebuch, Fotoalben, Blog'),
  ('backen',      'Backen',      'Videos, Rezepte, Sauerteig-Theorie'),
  ('feuilleton',  'Feuilleton',  'Texte im Magazin-Stil'),
  ('existenziell','Existenziell','Freier Upload-Bereich'),
  ('gedichte',    'Gedichte',    'Sortiert nach Lebensabschnitt');

-- ============================================================
-- 2. KATEGORIEN (pro Rubrik getrennt)
-- ============================================================
create table kategorien (
  id          uuid primary key default gen_random_uuid(),
  rubrik_id   uuid not null references rubriken(id) on delete cascade,
  name        text not null,
  erstellt_am timestamptz not null default now(),
  unique(rubrik_id, name)
);

-- ============================================================
-- 3. SORTIERMODI
-- ============================================================
create type sortiertyp as enum ('system', 'benutzerdefiniert');

create table sortiermodi (
  id        uuid primary key default gen_random_uuid(),
  rubrik_id uuid not null references rubriken(id) on delete cascade,
  name      text not null,
  typ       sortiertyp not null default 'system',
  unique(rubrik_id, name)
);

-- Standard-Sortiermodi für alle Rubriken einfügen
insert into sortiermodi (rubrik_id, name, typ)
select r.id, m.name, 'system'::sortiertyp
from rubriken r
cross join (
  values ('chronologisch'), ('thematisch'), ('visuell')
) as m(name);

-- ============================================================
-- 4. LEBENSABSCHNITTE (nur für Gedichte)
-- ============================================================
create table lebensabschnitte (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  start_datum date,
  end_datum   date  -- null = aktuell/offen
);

-- ============================================================
-- 5. INHALTE (Kerntabelle für alle Rubriken außer Rezepte)
-- ============================================================
create type inhalt_typ as enum ('artikel', 'gedicht', 'theorie', 'sonstiges');

create table inhalte (
  id                    uuid primary key default gen_random_uuid(),
  rubrik_id             uuid not null references rubriken(id) on delete restrict,
  typ                   inhalt_typ not null default 'artikel',
  titel                 text not null,
  text                  text,  -- Rich-Text / Markdown
  zeigen_in_feuilleton  boolean not null default false,
  lebensabschnitt_id    uuid references lebensabschnitte(id) on delete set null,
  erstellt_am           timestamptz not null default now(),
  aktualisiert_am       timestamptz not null default now()
);

-- Lebensabschnitt nur für Gedichte erlauben (Datenbankcheck)
alter table inhalte add constraint gedicht_lebensabschnitt
  check (lebensabschnitt_id is null or typ = 'gedicht');

-- Trigger: aktualisiert_am automatisch setzen
create or replace function update_aktualisiert_am()
returns trigger language plpgsql as $$
begin
  new.aktualisiert_am = now();
  return new;
end;
$$;

create trigger inhalte_aktualisiert
  before update on inhalte
  for each row execute function update_aktualisiert_am();

-- ============================================================
-- 6. INHALT_KATEGORIEN (n:m)
-- ============================================================
create table inhalt_kategorien (
  inhalt_id    uuid not null references inhalte(id) on delete cascade,
  kategorie_id uuid not null references kategorien(id) on delete cascade,
  primary key (inhalt_id, kategorie_id)
);

-- ============================================================
-- 7. MEDIEN
-- ============================================================
create type medien_typ as enum ('bild', 'video_embed');
create type video_plattform as enum ('youtube', 'instagram', 'tiktok', 'vimeo', 'facebook');

create table medien (
  id               uuid primary key default gen_random_uuid(),
  inhalt_id        uuid not null references inhalte(id) on delete cascade,
  typ              medien_typ not null,
  storage_pfad     text,  -- Supabase Storage Pfad (nur für Bilder)
  video_plattform  video_plattform,
  video_url        text,
  reihenfolge      integer not null default 0,
  constraint bild_hat_pfad  check (typ != 'bild' or storage_pfad is not null),
  constraint video_hat_url  check (typ != 'video_embed' or video_url is not null)
);

-- ============================================================
-- 8. RADREISE_STRECKEN
-- ============================================================
create type strecken_eingabe as enum ('start_ziel', 'gpx_datei', 'link');
create type link_anbieter as enum ('komoot', 'google_maps', 'bergfex');

create table radreise_strecken (
  id               uuid primary key default gen_random_uuid(),
  inhalt_id        uuid not null references inhalte(id) on delete cascade,
  eingabe_methode  strecken_eingabe not null,
  -- Methode A: Start/Ziel
  start_ort        text,
  ziel_ort         text,
  app              text,
  verkehrsmittel   text,
  -- Methode B: GPX
  gpx_storage_pfad text,
  -- Methode C: Link
  external_link    text,
  link_anbieter    link_anbieter,
  -- Berechnetes Ergebnis (für alle Methoden, sobald verfügbar)
  route_geometrie  jsonb,  -- GeoJSON LineString
  klickzahl        integer not null default 0
);

-- ============================================================
-- 9. PLATTFORM_VERBINDUNGEN
-- ============================================================
create type plattform_name as enum ('youtube', 'instagram', 'tiktok', 'vimeo', 'facebook', 'adobe_cc', 'google_drive', 'dropbox');
create type plattform_typ as enum ('video', 'bild');
create type verbindung_status as enum ('aktiv', 'abgelaufen');

create table plattform_verbindungen (
  id              uuid primary key default gen_random_uuid(),
  plattform       plattform_name not null,
  typ             plattform_typ not null,
  zugriffstoken   text,  -- in der Anwendung verschlüsselt speichern, nie im Klartext
  verbunden_am    timestamptz not null default now(),
  status          verbindung_status not null default 'aktiv',
  unique(plattform)
);

-- ============================================================
-- 10. REZEPTE
-- ============================================================
create table rezepte (
  id              uuid primary key default gen_random_uuid(),
  titel           text not null,
  stueckgewicht_g integer,  -- null = Stück-Modus nicht verfügbar
  erstellt_am     timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);

create trigger rezepte_aktualisiert
  before update on rezepte
  for each row execute function update_aktualisiert_am();

create type zutat_kategorie as enum ('mehl', 'liquid', 'kochstueck', 'quellstueck', 'salz', 'zusaetzliches');

create table rezept_zutaten (
  id                           uuid primary key default gen_random_uuid(),
  rezept_id                    uuid not null references rezepte(id) on delete cascade,
  name                         text not null,
  kategorie                    zutat_kategorie not null,
  anteil_prozent               numeric(6,2),  -- nur für Mehl
  baeckerprozent               numeric(6,2),  -- für alle außer Mehl
  verhaeltnis_wasser_zu_getreide text,        -- z. B. "4:1", nur für Kochstück/Quellstück
  reihenfolge                  integer not null default 0,
  -- Sicherheits-Checks
  constraint mehl_hat_anteil      check (kategorie != 'mehl' or anteil_prozent is not null),
  constraint nichtmehl_hat_baecker check (kategorie = 'mehl' or baeckerprozent is not null),
  constraint kochquell_hat_verh   check (
    kategorie not in ('kochstueck', 'quellstueck') or verhaeltnis_wasser_zu_getreide is not null
  )
);

-- ============================================================
-- 11. DESIGN_EINSTELLUNGEN
-- ============================================================
create table design_einstellungen (
  id        uuid primary key default gen_random_uuid(),
  rubrik_id uuid references rubriken(id) on delete cascade,  -- null = global
  schluessel text not null,
  wert       text,  -- Supabase Storage Pfad oder Text
  unique(rubrik_id, schluessel)
);

-- Globale Einstellung: Bedeutungstext der Home-Seite
insert into design_einstellungen (rubrik_id, schluessel, wert) values
  (null, 'home_bedeutungstext',
   'Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende "-te" bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.');

-- ============================================================
-- 12. INDIZES für häufige Abfragen
-- ============================================================
create index idx_inhalte_rubrik      on inhalte(rubrik_id);
create index idx_inhalte_feuilleton  on inhalte(zeigen_in_feuilleton) where zeigen_in_feuilleton = true;
create index idx_inhalte_erstellt    on inhalte(erstellt_am desc);
create index idx_inhalte_typ         on inhalte(typ);
create index idx_kategorien_rubrik   on kategorien(rubrik_id);
create index idx_sortiermodi_rubrik  on sortiermodi(rubrik_id);
create index idx_medien_inhalt       on medien(inhalt_id);
create index idx_strecken_inhalt     on radreise_strecken(inhalt_id);
create index idx_rezept_zutaten      on rezept_zutaten(rezept_id, reihenfolge);
