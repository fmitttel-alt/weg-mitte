# Weg-Mitte — Projektspezifikation für Claude Code

Dieses Dokument ist die vollständige Spezifikation für den Bau der Website Weg-Mitte.
Es ist so geschrieben, dass es **direkt an Claude Code übergeben werden kann** (z. B. als
`PROJECT_SPEC.md` im Repository-Root, oder Abschnitt für Abschnitt als Anweisung).

**Status:** Alle Grundsatzfragen sind geklärt. Bekannte technische Stolpersteine sind bereits
gelöst und unten dokumentiert, damit sie nicht erneut auftreten.

---

## 0. Projektidentität

| Feld | Wert |
|---|---|
| Name | Weg-Mitte |
| Domain | weg-mitte.com (registriert bei Strato, DNS noch auf Vercel umzustellen) |
| Bestehende Zweit-Domain | weg-brot.de (Strato, bleibt bestehen, später ggf. Weiterleitung auf Backen-Rubrik) |
| Ersteller | Florian Mittel, Einzelunternehmen "merkurem" |
| Instagram | veloweg_vertrauen (Reise), weg_brot (Backen) |
| Sprache | Deutsch und Englisch (zweisprachig, UI-Texte sollten i18n-fähig strukturiert werden, auch wenn am Anfang nur Deutsch befüllt wird) |
| Repository | GitHub: `weg-mitte` (bereits angelegt) |
| Hosting | Vercel (Hobby-Tarif, kostenlos), per GitHub-Push automatisch deployt |

**Bedeutungstext für die Home-Seite** (muss als editierbarer Inhalt im Erstellerbereich
gespeichert sein, nicht hartcodiert):

> Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines
> Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende "-te" bereits
> den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.

---

## 1. Technologie-Stack (festgelegt, mit Begründung)

| Baustein | Wahl | Begründung |
|---|---|---|
| Framework | Next.js (App Router, TypeScript) | Vercel-natives Framework, Server Components, Server Actions für Forms |
| Styling | Tailwind CSS | gut für iteratives Design |
| Datenbank | **Supabase** (Postgres) | kostenloser Tarif, läuft nativ mit Vercel, liefert Datenbank UND Dateispeicher |
| Dateispeicher | **Supabase Storage** | ersetzt ursprünglich angedachte OneDrive-Lösung (final entschieden, nicht erneut diskutieren) |
| Auth Erstellerbereich | einfache Passwort-Session (Cookie, httpOnly) | nur eine einzige Person loggt sich ein, kein vollwertiges Auth-System nötig |
| Karten/Globus | react-globe.gl oder three-globe (Three.js-basiert) | einzige praktikable Lösung für stilisierte 3D-Erde im Browser |
| Routenberechnung | OpenRouteService API (kostenloses Kontingent) | kostenlose Routing-API mit Fahrrad-Profilen |
| GPX-Verarbeitung | `gpxparser` oder `@tmcw/togeojson` | leichtgewichtig, keine Server-Abhängigkeit |

### Bereits gelöste technische Probleme (nicht erneut diskutieren)

1. **Strato-Hosting** kann keine Node.js-Anwendung dauerhaft betreiben. → Vercel für die
   Anwendung, Strato bleibt nur als Domain-Registrar/DNS.
2. **OneDrive** ist für diese Architektur die falsche Wahl. → Supabase Storage ist final.
3. **GPX-Dateien** enthalten nur Geometrie — für Linien auf dem Globus ausreichend.
4. **`next/font/google`** schlägt in Sandboxen ohne Internetzugriff fehl (403). → Lokale
   Fonts oder System-Fonts nutzen, bis Design in Phase 2 festgelegt ist.
5. **Server Actions** für Login funktionieren nur im echten Browser zuverlässig, nicht mit
   reinem `curl`. Beim Testen `curl -L` mit Cookie-Jar verwenden.

---

## 2. Datenmodell (Supabase / Postgres)

### `rubriken` (fest vordefiniert, nicht vom Nutzer editierbar)
- `id`, `slug` (radreise | backen | feuilleton | existenziell | gedichte), `name`, `beschreibung`

### `kategorien`
- `id`, `rubrik_id` (FK), `name`, `erstellt_am`
- Kategorien sind **pro Rubrik getrennt**

### `sortiermodi`
- `id`, `rubrik_id` (FK), `name`, `typ` (system | benutzerdefiniert)
- Beim Anlegen automatisch drei System-Modi: `chronologisch`, `thematisch`, `visuell`
- Nutzer kann weitere `benutzerdefiniert`-Modi ergänzen

### `inhalte`
- `id`, `rubrik_id` (FK), `typ` (artikel | gedicht | theorie | sonstiges)
- `titel`, `text` (Rich-Text/Markdown), `erstellt_am`, `aktualisiert_am`
- `zeigen_in_feuilleton` (boolean) — für Zusatz-Anzeige im Feuilleton (Abschnitt 6)
- `lebensabschnitt_id` (FK, nullable) — nur für Gedichte

### `inhalt_kategorien` (n:m)
- `inhalt_id`, `kategorie_id` — ein Inhalt kann mehreren Kategorien zugeordnet sein

### `medien`
- `id`, `inhalt_id` (FK), `typ` (bild | video_embed)
- `storage_pfad` (Supabase Storage, nullable), `video_plattform` (nullable)
- `video_url` (nullable), `reihenfolge`

### `lebensabschnitte` (nur Gedichte)
- `id`, `name`, `start_datum`, `end_datum` (nullable — offen für "aktuell")

### `radreise_strecken`
- `id`, `inhalt_id` (FK), `eingabe_methode` (start_ziel | gpx_datei | link)
- `start_ort`, `ziel_ort`, `app`, `verkehrsmittel` (nur bei `start_ziel`)
- `gpx_storage_pfad` (nur bei `gpx_datei`)
- `external_link`, `link_anbieter` (komoot | google_maps | bergfex) (nur bei `link`)
- `route_geometrie` (GeoJSON/LineString, berechnet/extrahiert)
- `klickzahl` (integer, Standard 0) — für "Nach Klickzahl"-Sortierung

### `plattform_verbindungen`
- `id`, `plattform` (youtube | instagram | tiktok | vimeo | facebook)
- `typ` (video | bild), `zugriffstoken` (verschlüsselt), `verbunden_am`, `status` (aktiv | abgelaufen)

### `rezepte`
- `id`, `inhalt_id` (FK, nullable — Rezept ist eigenständiger Eintrag in Backen)
- `titel`, `stueckgewicht_g` (nullable, für Stück-Ansicht)
- Zutaten werden in eigener Tabelle `rezept_zutaten` gespeichert (siehe Abschnitt 7)

### `rezept_zutaten`
- `id`, `rezept_id` (FK), `name`, `kategorie` (mehl | liquid | kochstueck | quellstueck | salz | zusaetzliches)
- `anteil_prozent` (nullable, nur für Mehl), `baeckerprozent` (nullable)
- `verhaeltnis_wasser_zu_getreide` (text, z. B. "4:1", nullable — nur für Kochstück/Quellstück)
- `reihenfolge`

### `design_einstellungen`
- `id`, `rubrik_id` (FK, nullable für globale Einstellungen)
- `schluessel` (z. B. `hintergrundbild_header`), `wert` (Storage-Pfad oder Text)

---

## 3. Erstellerbereich — Zugriff

- Passwort über Umgebungsvariable `ERSTELLER_PASSWORD`
- Session per httpOnly-Cookie, 7 Tage gültig
- Keine Benutzerverwaltung — nur eine einzige Person

---

## 4. Cloud-Anbindungen für Medien

### 4.1 Videos — fünf Plattformen

1. **YouTube** (Data API v3, OAuth für eigenen Kanal)
2. **Instagram** (Graph API — **nur mit Business/Creator-Konto**, nicht privat. Falls
   veloweg_vertrauen / weg_brot noch privat sind, müssen sie in Instagram umgestellt werden —
   kostenlos, reversibel, "Das machst du"-Schritt für den Nutzer)
3. **TikTok** (TikTok for Developers API — hat Review-Verfahren, Fallback auf oEmbed vorsehen)
4. **Vimeo** (API, werbefreie Einbettung)
5. **Facebook/Meta Reels** (läuft über dieselbe Graph-API wie Instagram, geringer Zusatzaufwand)

**Fallback** wenn vollständige OAuth-API-Anbindung nicht sofort möglich: manueller Link im
Erstellerbereich, automatische Plattform-Erkennung am Link-Format, Einbettung via oEmbed.

### 4.2 Bilder/Dokumente — Cloud-Importquellen

1. **Supabase Storage** (intern, primärer Speicher — technisch erforderlich)
2. **Adobe Creative Cloud** (ausdrücklich gewünscht, Adobe I/O)
3. **Google Drive** (OAuth, einfache Anbindung)
4. **Dropbox** (OAuth, einfache Anbindung)
5. **iCloud-Fotos** — **keine offizielle öffentliche API**. Einziger Weg: manueller
   Export/Upload. Nutzer entsprechend informieren, keine Live-Anbindung möglich.

Externe Cloud-Anbindungen (2–4) sind Import-Quellen in den Supabase-Speicher, kein Ersatz.

---

## 5. Rubrik: Radreise

### 5.1 Struktur (vier Unterbereiche)
Videos (primär) → Videotagebuch → Fotoalben → Blog

### 5.2 Videotagebuch — drei Ansichtsmodi
Umschaltbar: **3D-Globus** | **Zeitlich** | **Nach Klickzahl**

### 5.3 3D-Globus
- Stilisierte (nicht fotorealistische) 3D-Erde
- Streckenlinie aus `radreise_strecken.route_geometrie`
- Klickbare Pins → öffnen verknüpftes Video
- Stilisierung orientiert sich an Region, Videoinhalt, Gesamtdesign (wird in Phase Design konkretisiert)

### 5.4 Streckenangabe beim Upload — drei Eingabewege

**A. Start/Ziel + App + Verkehrsmittel**
- Felder: Start-Ort, Ziel-Ort, App (Standard: Komoot), Verkehrsmittel (Rad | Rennrad | Gravel)
- Verarbeitung: Geocoding via OpenRouteService oder Nominatim → Routenberechnung via OpenRouteService

**B. Export-Datei (GPX bevorzugt)**
- Upload → `gpxparser` extrahiert Koordinaten → GeoJSON-LineString in `route_geometrie`
- Originaldatei in Supabase Storage

**C. Direkter Link**
- Freitextfeld (Komoot / Google Maps / Bergfex)
- **Keine automatische Geometrie-Extraktion** (keine stabile API verfügbar)
- Nur Standort-Pin auf dem Globus (kein Linienverlauf), Link als "Route ansehen"-Button
- Dem Nutzer klar kommunizieren

### 5.5 Blog
- Standardsortierung chronologisch, Volltextsuche, Kategorie-Filter
- Einträge können mit `zeigen_in_feuilleton = true` markiert werden

---

## 6. Rubrik: Feuilleton

- Eigenständige Magazin-Struktur (Stilvorbild: Zeit Online / redaktioneller Blog)
- Zeigt eigene Feuilleton-Inhalte **und** alle anderen Inhalte mit `zeigen_in_feuilleton = true`
- Abfrage: `rubrik_id = feuilleton OR zeigen_in_feuilleton = true`
- Kein doppelter Datenbank-Eintrag — ein Eintrag, zwei Erscheinungsorte

---

## 7. Rubrik: Backen

### 7.1 Struktur (drei Unterbereiche)

1. **Videos** (primär, prominentester Bereich)
2. **Rezepte** (Rezeptrechner, siehe 7.2–7.8)
3. **Theorie** (Sauerteig-Hintergrundwissen)
   - Normale `inhalte`-Einträge mit `rubrik_id = backen` und `typ = 'theorie'`
   - Kein eigenes Datenmodell nötig
   - Im Erstellerbereich als eigener Navigationspunkt neben "Videos" und "Rezepte" sichtbar
   - Darstellung wie Blog: chronologisch, mit Volltextsuche und Kategorien

### 7.2 Rezeptrechner — Grundprinzip

Freier Blog-Baustein-Editor (Text + Bild) **plus** spezieller Rezeptrechner-Baustein
(Tabellenkalkulations-Logik). Alle Bäckerprozente beziehen sich auf **1 kg Mehl gesamt**.

### 7.3 Zutaten-Kategorien (fest, sechs Stück)
1. Mehl  2. Liquid  3. Kochstück  4. Quellstück  5. Salz  6. Zusätzliches

### 7.4 Dateneingabe im Erstellerbereich
- `name` (Freitext), `kategorie` (Auswahl)
- **Mehl:** `anteil_prozent` (Anteil an Gesamtmehlmenge)
- **Liquid, Salz, Zusätzliches:** `baeckerprozent`
- **Kochstück, Quellstück:** `baeckerprozent` + `verhaeltnis_wasser_zu_getreide` (z. B. "4:1")

### 7.5 Berechnungslogik — exakte Formeln

`G` = vom Nutzer eingegebene Gesamtteigmenge in kg.

**Schritt 1 — Gesamtmehlmenge M:**
```
S = 100 + Summe(baeckerprozent aller Nicht-Mehl-Zutaten)
M = G / (S / 100)
```

**Schritt 2 — Mehl-Anteile normalisieren:**
```
anteil_normalisiert_i = anteil_prozent_i / Summe(alle anteil_prozent) * 100
menge_mehl_i = M * (anteil_normalisiert_i / 100)
```
Funktioniert auch wenn Summe der Anteile ≠ 100 % (z. B. nur 80 % eingegeben).

**Schritt 3 — Liquid, Salz, Zusätzliches:**
```
menge_i = M * (baeckerprozent_i / 100)
```

**Schritt 4 — Kochstück / Quellstück** (Verhältnis W:K, z. B. "4:1"):
```
gesamtmenge_i = M * (baeckerprozent_i / 100)
wasseranteil_i = gesamtmenge_i * W / (W + K)
getreideanteil_i = gesamtmenge_i * K / (W + K)
```
Beispiel (Emmerkochstück, 4:1, 10 %, M = 1 kg):
→ 100 g gesamt → 80 g Wasser + 20 g Emmer ✓

**Schritt 5 — Gesamthydration:**
```
Gesamthydration (%) = Summe(baeckerprozent Liquid)
                    + Summe(wasseranteil_i / M * 100) für alle Kochstück-/Quellstück-Zutaten
```

### 7.6 Verbraucheransicht

- Spalte 1: Kategorie (verbundene Zellen), Spalte 2: Zutat, Spalte 3: Gewicht (live berechnet)
- Gesamthydration prominent angezeigt
- `G`-Eingabefeld live editierbar (React State, kein Server-Roundtrip für Neuberechnung)

### 7.7 Ansichtsmodus: kg vs. Stück

- Umschalt-Button "kg" | "Stück"
- Stück-Modus: Nutzer gibt Stückzahl ein → `G = (Stückzahl * stueckgewicht_g) / 1000`
- Wenn `stueckgewicht_g` nicht gesetzt: nur kg-Modus anzeigen (kein Fehler)

### 7.8 Freie Blog-Bausteine

Text- und Bild-Bausteine frei um die Rezepttabelle platzierbar (gleiche Logik wie Radreise-Blog).

---

## 8. Rubrik: Existenziell

Freier Upload-Bereich für Bilder/Texte/Sonstiges. **Kein Zeichenblock** (verworfen, final).
Gleiche Medien-Infrastruktur wie andere Rubriken.

---

## 9. Rubrik: Gedichte

- Standardsortierung nach `lebensabschnitte` (chronologisch über `start_datum`)
- Frei definierbare Sortiermodi wie bei anderen Rubriken

---

## 10. Design

### 10.1 Stilrichtung
Mischung aus **digitalem Atelier, hochwertigem Magazin, Archiv und persönlichem Journal**.

### 10.2 Vorgehen

- Hintergrundbilder stammen **vom Nutzer** (eigene Fotos). Kein Stockmaterial hardcodieren.
- Jedes Hintergrundbild ist ein austauschbares Datenfeld (`design_einstellungen`-Tabelle)
- Self-Service-Bildaustausch im Erstellerbereich mit Live-Vorschau
- Design ist ein **eigener, separater Arbeitsschritt** — dieses Dokument legt nur die
  Architektur der Austauschbarkeit fest, nicht das fertige visuelle Ergebnis

---

## 11. Offene Punkte

1. **Instagram-Kontotyp** (veloweg_vertrauen, weg_brot): müssen ggf. auf Business/Creator
   umgestellt werden — vor Schritt 4.1 prüfen.
2. **TikTok-Entwicklerzugang**: Review-Verfahren nötig. Fallback (oEmbed) ist in 4.1 vorgesehen.
3. **Design-Feinkonzept** (Farben, Typografie, Bilder je Rubrik) — separater Arbeitsschritt.

---

## 12. Reihenfolge für Claude Code

1. Bestehendes Repository (`weg-mitte`) als Basis nehmen — Next.js-Grundgerüst mit
   Navigation, Login, 5 Rubriken inkl. Backen-Unterstruktur (Videos / Rezepte / Theorie)
2. Supabase-Projekt verbinden, Datenmodell aus Abschnitt 2 als Migration umsetzen
3. Generisches Inhalte-/Kategorien-/Sortiermodi-System (Abschnitt 2–3) — Basis für alle Rubriken
4. Feuilleton-Verlinkungslogik (Abschnitt 6)
5. Rezeptrechner (Abschnitt 7) als isolierte Komponente — zuerst Unit-Tests der Berechnungslogik
   gegen die Beispielwerte in Abschnitt 7.5 prüfen, dann UI anbinden
6. Plattform-Anbindungen (Abschnitt 4) — oEmbed-Fallback zuerst, OAuth danach
7. Globus-Visualisierung (Abschnitt 5.3–5.4) — zuletzt (aufwändigste Komponente)
8. Design-Feinschliff (Abschnitt 10) — separater Arbeitsschritt
