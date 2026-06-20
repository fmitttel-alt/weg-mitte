# Bauplan: Weg-Mitte

**Projekt:** Persönliche Website zur zentralen Präsentation von Content (Radreise, Backen, Feuilleton, Existenziell, Gedichte)
**Name & Domain:** Weg-Mitte / weg-mitte.com
**Bedeutung des Namens** *(editierbarer Text für die Home-Rubrik)*: Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende "-te" bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist.
**Ersteller:** Florian Mittel (Einzelunternehmen: merkurem)
**Instagram-Verknüpfung:** veloweg_vertrauen (Reise), weg_brot (Backen)
**Sprache:** zweisprachig, Deutsch und Englisch
**Domain-Bestand:** weg-brot.de (bereits vorhanden, Strato) – wird parallel zu weg-mitte.com weitergeführt; .com-Variante von Weg-Mitte ist für später denkbar, aktuell nicht nötig
**Rollen:** Nutzerbereich (öffentlich) + Erstellerbereich (passwortgeschützt)
**Stand:** Alle Grundsatzfragen geklärt – bereit zur Umsetzung

---

## Wie wir vorgehen

Du hast gesagt: möglichst wenig selbst tun müssen, dafür klare Anleitung, wo du wirklich etwas tun musst. Deshalb funktioniert dieses Dokument so:

- Jeder Schritt hat einen **Prompt-Vorschlag** – den gibst du mir 1:1 in den Chat.
- Wo *du* etwas außerhalb von Claude tun musst (Konto anlegen, Datei exportieren, Klick bei einem Anbieter), steht das explizit unter **"Das machst du"** – kurz, konkret, ohne Vorwissen vorauszusetzen.
- Alles andere übernehme ich. Wenn ein Schritt eine andere Claude-Funktion sinnvoll nutzt (z. B. Claude Code für die eigentliche Programmierung, eine Projektmappe für die Dateiablage), weise ich genau darauf hin.

---

## Zusammenfassung der Entscheidungen

### Inhaltliche Struktur

**Home** – Überblicksseite, die erklärt, was Weg-Mitte ist (inkl. des editierbaren Namens-Bedeutungstextes oben), mit Einstieg in die 5 Rubriken

**5 Rubriken:**
1. **Radreise** – Videos (primär) → Videotagebuch mit 3D-Globus → Fotoalben → Blog
2. **Backen** – Videos (primär) → eigene Rezepte → Sauerteig-Theorie
3. **Feuilleton** – eigenständiger Bereich im Stil eines Online-Magazins (Vorbild: Zeit Online / klassische Blogs), zeigt zusätzlich Text+Bild-Einträge aus anderen Rubriken, die du dafür markierst
4. **Existenziell** – freier Upload-Bereich für Bilder/Texte/Sonstiges (kein Zeichenblock mehr, siehe unten)
5. **Gedichte** – sortiert nach Lebensabschnitt (chronologisch), weitere frei definierbare Sortierungen

### Technischer Rahmen
- **Hosting (die eigentliche Website-Anwendung):** Vercel, kostenloser Hobby-Tarif, Anbindung über GitHub. Begründung: Strato-Standardhosting unterstützt keine dauerhaft laufenden Node.js-Anwendungen, wie sie für Login-Bereich, Datenbank-Anbindung und dynamische Kategorien nötig sind – nur ein separater, deutlich teurerer Server (VPS) würde das bei Strato direkt ermöglichen. Vercel übernimmt das kostenlos
- **Domain:** weg-mitte.com, Registrierung über Strato (dein bestehendes Konto), DNS-Verweis anschließend auf Vercel
- **Bestehende Domain weg-brot.de:** bleibt bei Strato bestehen, kann später z. B. als Weiterleitung auf die Backen-Rubrik genutzt werden (kein eigenständiges zweites Projekt)
- **Datenhaltung Texte/Struktur/Kategorien:** eigene kleine Datenbank (technisch notwendig, OneDrive eignet sich nicht für strukturierte Abfragen wie "alle Texte aus Kategorie X chronologisch" – dazu mehr in Phase 0)
- **Datenhaltung Bilder/Dokumente:** OneDrive-Anbindung über Microsoft Graph API, wie gewünscht
- **Videos:** kein eigenes Hosting. Anbindung von YouTube- und Instagram-Konten im Erstellerbereich, Videos werden automatisch aus den verknüpften Konten gezogen und eingebettet
- **Erstellerbereich:** passwortgeschützt
- **Startzustand:** keine Inhalte vorab, nur das für Design/Struktur Notwendige. Aller echter Content kommt über den Erstellerbereich

### Design
- Stilrichtung: Mischung aus **digitalem Atelier, hochwertigem Magazin, Archiv und persönlichem Journal**
- Vorgehen: Ich entwerfe ein durchgängiges Grunddesign, das diese Stimmung trifft. Innerhalb dieses Grundgerüsts kannst du danach selbst Bereiche anpassen – v. a. Hintergrundbilder/Bildwelten pro Rubrik – ähnlich wie bei WordPress-Themes, aber einfacher und visueller
- Design ist eine **eigene Phase**, bevor Funktionalität im Detail gebaut wird

### Globus / Videotagebuch (Radreise)
- **Stilisierte 3D-Erde** (kein fotorealistischer Globus), Stil orientiert sich an Streckenregion, Videoinhalten und Gesamtdesign
- Drei Wege, eine Strecke mit den Video-Pins zu verknüpfen, frei wählbar bei jedem Upload:
  - **A. Start/Ziel + App + Verkehrsmittel** (bei dir meist Komoot, Rad/Rennrad/Gravel) → Route wird automatisch berechnet
  - **B. Export-Datei der Strecke** (GPX bevorzugt, da das Komoot- und Google-Standardformat; auch andere gängige Formate möglich)
  - **C. Direkter Link** zu Komoot, Google Maps oder Bergfex
- Ergänzend weiterhin: Umschalter zwischen Globus-Ansicht, zeitlicher Sortierung und Sortierung nach Klickzahl (YouTube-artig)

### Feuilleton-Verlinkung (präzisiert)
- Feuilleton hat eine **eigenständige Struktur** im Stil eines Online-Magazins/klassischen Blogs – kein bloßer Reiter im Radreise-Blog
- Wenn ein Text+Bild-Eintrag aus einer anderen Rubrik (z. B. Radreise-Blog) inhaltlich auch ins Feuilleton passt, markierst du ihn beim Hochladen entsprechend – er erscheint dann **zusätzlich** im Feuilleton, ohne dass du ihn doppelt schreiben oder hochladen musst

### Existenziell (präzisiert)
- Kein KI-Zeichenblock mehr (gestrichen)
- Bleibt: freier, formloser Upload-Bereich für Bilder, Texte, Sonstiges

---

## Offene Fragen
*(Bewusst nicht von mir entschieden – bitte vor dem jeweils verlinkten Schritt klären)*

1. ~~Domainname~~ → **geklärt: weg-mitte.com, Registrar Strato**
2. **OneDrive-Konto:** Privates Microsoft-Konto oder ein eigens für die Website angelegtes? → relevant für Schritt 0.4
3. **Datenbank-Hosting:** Ich schlage eine kostenlose, einfache Cloud-Datenbank vor (z. B. eine, die direkt zu Vercel passt). Falls du eine konkrete Präferenz/Vorerfahrung hast, sag es vor Schritt 0.2, sonst wähle ich die unkomplizierteste Option
4. **Plattform-Konten:** Welche Plattformen genau sollen im Erstellerbereich verknüpft werden – nur YouTube + Instagram, oder noch weitere ("andere wichtige Plattformen")? → relevant für Schritt 3.1
5. **Rezept-Datenformat:** Sollen Rezepte ein festes Format haben (Zutatenliste + Schritte, ähnlich der Recipe-Darstellung) oder freier Text wie beim Blog? → relevant für Schritt 1.3
6. **Bilder-Rechte bei Atelier/Magazin-Design:** Sollen Design-Hintergrundbilder von dir stammen (z. B. eigene Fotos) oder darf ich Vorschläge mit Stockbildern/KI-generierten Bildern machen, die du später ersetzt? → relevant für Schritt 2.1

---

## Phase 0: Technisches Fundament

Diese Phase legt die Konten und Verbindungen an, die alles andere trägt. Sie ist der Teil mit dem meisten "Das machst du" – danach übernehme ich den Großteil.

### Schritt 0.1 – GitHub-Konto & Vercel-Verknüpfung
**Ziel:** Ein Konto, über das der Code verwaltet wird, und die Verbindung zu Vercel (Hosting), damit jede neue Version automatisch live geht.

**Das machst du:**
1. Auf github.com ein kostenloses Konto anlegen (falls noch nicht vorhanden)
2. Auf vercel.com mit "Continue with GitHub" anmelden – das verknüpft beide automatisch
3. Mir Bescheid geben, sobald beide Konten stehen

**Prompt-Vorschlag (danach):**
> Ich habe GitHub und Vercel eingerichtet und verknüpft. Lege bitte das Grundgerüst für mein Website-Projekt an (Next.js) und erkläre mir in einfachen Schritten, wie ich es über GitHub mit Vercel verbinde, damit es online sichtbar wird.

**Worauf achten:**
- Bekommst du am Ende eine echte, aufrufbare Vorschau-URL (sieht aus wie `projektname.vercel.app`)?
- Funktioniert die Anzeige auch auf deinem Handy, nicht nur am Computer?

---

### Schritt 0.2 – Datenbank einrichten
**Ziel:** Ein Ort, an dem Texte, Kategorien-Zuordnungen und Struktur-Daten zuverlässig gespeichert werden (OneDrive kann das technisch nicht leisten, dazu gleich mehr).

**Prompt-Vorschlag:**
> Schlage mir eine kostenlose, einfache Datenbank-Lösung vor, die gut zu meinem Vercel-Projekt passt. Ich will damit Texte, Kategorien und deren Zuordnungen speichern. Erkläre mir in 3–4 einfachen Schritten, wie ich das Konto anlege, und übernimm danach die technische Einrichtung.

**Das machst du:** Konto bei der vorgeschlagenen Datenbank anlegen (üblicherweise: E-Mail bestätigen, fertig). Den genauen Anbieter und die genauen Klicks nenne ich dir erst, wenn wir an diesem Schritt stehen.

**Worauf achten:**
- Ist klar, dass diese Datenbank nur "unsichtbare" Strukturdaten speichert (was gehört zu welcher Kategorie, in welcher Reihenfolge) – nicht deine eigentlichen Fotos/Dokumente? Die liegen weiter in OneDrive.

---

### Schritt 0.3 – Domain weg-mitte.com mit Vercel verbinden
**Ziel:** weg-mitte.com (bei Strato bereits registriert) so einrichten, dass sie auf die neue Website zeigt.

**Prompt-Vorschlag:**
> Ich habe die Domain weg-mitte.com bereits bei Strato registriert. Erkläre mir genau, welche Einstellung ich im Strato-Domainbereich vornehmen muss, damit die Domain auf mein Vercel-Projekt zeigt, und übernimm die Einrichtung auf der Vercel-Seite.

**Das machst du:** Im Strato-Kundenbereich bei der Domain weg-mitte.com unter "DNS-Einstellungen" zwei von mir genannte Einträge (sogenannte A-Record/CNAME-Werte) eintragen – das sind zwei Kopier-Einfüge-Schritte, keine freie Eingabe. Ich nenne dir die exakten Werte, sobald das Vercel-Projekt existiert (nach Schritt 0.1).

**Worauf achten:**
- Ist weg-mitte.com nach Eintragung (kann bis zu 24h dauern) erreichbar und zeigt die Website, nicht eine Strato-Standardseite?
- Bleibt weg-brot.de davon komplett unberührt (separate Domain, separate Einstellung)?

---

### Schritt 0.4 – OneDrive-Anbindung (Microsoft Graph API)
**Ziel:** Die Website kann automatisiert Bilder/Dokumente aus deinem OneDrive lesen und anzeigen.

**Prompt-Vorschlag:**
> Richte die technische Verbindung zwischen meiner Website und meinem OneDrive-Konto ein (Microsoft Graph API), damit ich später Bilder und Dokumente direkt aus OneDrive in die Website einbinden kann. Erkläre mir genau, welche Klicks ich im Microsoft-Konto dafür machen muss.

**Das machst du:** Eine "App-Registrierung" im Microsoft-Konto bestätigen (im Kern: einmalig auf "Zugriff erlauben" klicken, wenn Microsoft danach fragt). Die genauen Klicks zeige ich dir mit Screenshots-Beschreibung, wenn wir an diesem Punkt sind.

**Worauf achten:**
- Wird nur Lesezugriff auf einen bestimmten OneDrive-Ordner gewährt (nicht dein komplettes Konto)?
- Lässt sich der Zugriff bei Bedarf jederzeit in deinem Microsoft-Konto wieder entziehen?

---

## Phase 1: Struktur & Layout (Grundgerüst)

### Schritt 1.1 – Globale Navigation & Seitengerüst
**Ziel:** Klickbare Grundstruktur mit allen 5 Rubriken, Umschaltung zwischen Nutzerbereich und passwortgeschütztem Erstellerbereich.

**Prompt-Vorschlag:**
> Baue das Grundgerüst meiner Website "Weg-Mitte". Ich brauche eine globale Navigation mit "Home" und den 5 Rubriken Radreise, Backen, Feuilleton, Existenziell, Gedichte. Zusätzlich einen Login-Bereich für den Erstellerbereich (passwortgeschützt) und eine öffentliche Nutzeransicht. Jede Rubrik bekommt vorerst eine leere Platzhalterseite mit Titel. Noch kein Design-Feinschliff, es geht nur um Navigation, Seitenstruktur und den Login-Mechanismus.

**Worauf achten:**
- Sind alle 5 Rubriken erreichbar?
- Verlangt der Erstellerbereich wirklich ein Passwort, bevor irgendetwas davon sichtbar wird?
- Ist die Struktur so angelegt, dass jede Rubrik später ihren eigenen individuellen Aufbau bekommen kann?

---

### Schritt 1.1b – Home-Rubrik
**Ziel:** Eine Überblicksseite, die erklärt, was Weg-Mitte ist, inklusive des editierbaren Namens-Bedeutungstextes.

**Prompt-Vorschlag:**
> Baue die Home-Rubrik als Überblicksseite. Sie soll kurz erklären, was Weg-Mitte ist, und dabei folgenden Text zur Bedeutung des Namens enthalten (editierbar im Erstellerbereich): „Weg-Mitte trägt mehrere Ebenen zugleich – den Nachnamen Mittel, den Gedanken eines Mittelwegs/Knotenpunkts zwischen Erwartung und Loslassen, und im Wortende '-te' bereits den Anklang eines Ziels, das offen bleibt und doch in der Mitte schon angelegt ist." Darunter soll ein kurzer, einladender Einstieg in die 5 Rubriken folgen (kleine Vorschau-Kacheln mit Link).

**Worauf achten:**
- Lässt sich der Bedeutungstext später im Erstellerbereich wirklich bearbeiten, ohne Code anzufassen?
- Wirkt die Seite als echter Einstiegspunkt, nicht nur als Textblock?

---

### Schritt 1.2 – Rubrik-Layout „Radreise“
**Ziel:** Die vier Unterbereiche (Videos, Videotagebuch, Fotoalben, Blog) als Tabs/Untermenü anlegen.

**Prompt-Vorschlag:**
> Baue innerhalb der Rubrik „Radreise" vier Unterbereiche als Tabs: 1) Videos (übergeordnete Inhalte, primärer Bereich), 2) Videotagebuch, 3) Fotoalben, 4) Blog. Im Videotagebuch-Bereich reserviere schon Platz für drei Ansichts-Umschalter: „3D-Globus", „Zeitlich", „Nach Klickzahl" – noch ohne Funktion, nur als Buttons.

**Worauf achten:**
- Ist erkennbar, dass „Videos" der primäre/prominenteste Bereich ist?
- Sind die drei Umschalter im Videotagebuch sichtbar angelegt?

---

### Schritt 1.3 – Rubrik-Layout „Backen“
**Ziel:** Drei Unterbereiche (Videos, Rezepte, Sauerteig-Theorie) anlegen.

**Prompt-Vorschlag:**
> Baue innerhalb der Rubrik „Backen" drei Unterbereiche: 1) Videos (primär), 2) Eigene Rezepte, 3) Theorie über Sauerteigbacken. „Videos" soll optisch als wichtigster Bereich erkennbar sein.

> *Hinweis: Bitte Offene Frage 5 (Rezeptformat) vorher kurz beantworten – das beeinflusst, wie wir den Rezeptbereich technisch aufbauen.*

**Worauf achten:**
- Ist die Priorität (Videos zuerst) klar abgebildet?
- Sind Rezepte und Theorie klar als unterschiedliche Inhaltstypen erkennbar?

---

### Schritt 1.4 – Rubrik-Layout „Feuilleton"
**Ziel:** Eigenständige Magazin-Struktur für das Feuilleton anlegen, inklusive Vorbereitung für die Übernahme markierter Inhalte aus anderen Rubriken.

**Prompt-Vorschlag:**
> Baue die Grundstruktur für die Rubrik „Feuilleton" im Stil eines hochwertigen Online-Magazins (Vorbild: Zeit Online, klassische Blog-Seiten) – eigene Optik, eigene Anordnung, nicht einfach ein Reiter im Blog. Reserviere konzeptionell Platz dafür, dass hier zusätzlich Einträge erscheinen können, die ursprünglich in anderen Rubriken (z. B. Radreise-Blog) veröffentlicht wurden, aber für Feuilleton markiert sind.

**Worauf achten:**
- Wirkt das Feuilleton eigenständig und nicht wie eine Kopie des Radreise-Blogs?
- Ist konzeptionell vorgesehen, dass ein Eintrag an zwei Stellen (Ursprungsrubrik + Feuilleton) erscheinen kann, ohne doppelt gepflegt zu werden?

---

### Schritt 1.5 – Rubrik-Layout „Existenziell" und „Gedichte"
**Ziel:** Grundgerüst der zwei übrigen Rubriken anlegen.

**Prompt-Vorschlag:**
> Baue die Grundstruktur für zwei Rubriken:
> - „Existenziell": freie Upload-Fläche für Bilder, Texte und sonstige Inhalte, ohne feste Struktur.
> - „Gedichte": Liste von Texten, standardmäßig nach Lebensabschnitt sortiert (chronologisch), mit Platz für weitere, später frei definierbare Sortierungen.
> Noch kein Feindesign, nur Struktur und Platzhalter.

**Worauf achten:**
- Wirkt „Existenziell" bewusst freier/offener als die anderen, stärker strukturierten Rubriken?
- Ist Platz für künftige, frei definierbare Lebensabschnitte/Kategorien vorgesehen?

---

## Phase 2: Design (visuelle Gestaltung)

### Schritt 2.1 – Design-Entwurf
**Ziel:** Ein durchgängiges visuelles Grundkonzept, das die gewünschte Stimmung trifft – Mischung aus digitalem Atelier, hochwertigem Magazin, Archiv und persönlichem Journal.

**Prompt-Vorschlag:**
> Entwerfe das visuelle Grundkonzept meiner Website. Die Stimmung soll eine Mischung sein aus: digitalem Atelier, hochwertigem Magazin, Archiv und persönlichem Journal. Zeig mir eine Farbpalette, eine Schriftkombination (z. B. eine editoriale Headline-Schrift + eine ruhige Lesefont) und wie sich diese Stimmung in Navigation, Startseite und einer Beispiel-Rubrikseite anfühlt. Baue das Konzept so, dass Hintergrundbilder/Bildwelten pro Rubrik später von mir selbst ausgetauscht werden können, ohne das Grundgerüst zu zerstören.

> *Hinweis: Beantworte vorher kurz Offene Frage 6 (eigene Fotos vs. Platzhalterbilder), das beeinflusst, was ich dir hier zeigen kann.*

**Worauf achten:**
- Wirkt der Entwurf eher wie ein „Archiv mit Charakter" oder eher wie eine generische Vorlage? Sag konkret, welches der vier Stichworte (Atelier/Magazin/Archiv/Journal) dir am meisten fehlt, falls etwas fehlt.
- Ist erkennbar, *welche* Flächen später austauschbar sein werden (z. B. Hintergrundbild hinter dem Rubrik-Titel)?

---

### Schritt 2.2 – Design auf das Grundgerüst anwenden
**Ziel:** Die gewählte Stilrichtung auf Navigation, Startseite und alle 5 Rubrik-Grundgerüste anwenden.

**Prompt-Vorschlag:**
> Wende das in Schritt 2.1 festgelegte Design auf die komplette Website an: Navigation, Startseite, alle fünf Rubrikseiten. Markiere dabei klar (z. B. im Code mit Kommentaren), welche Bild-/Hintergrundflächen ich später selbst über den Erstellerbereich austauschen kann.

**Worauf achten:**
- Bleibt die Seite trotz einheitlichem Stil klar in die 5 Themenwelten unterscheidbar?
- Ist der Login-geschützte Erstellerbereich optisch erkennbar abgegrenzt, aber stilistisch stimmig?

---

### Schritt 2.3 – Self-Service-Design im Erstellerbereich
**Ziel:** Du kannst im Erstellerbereich selbst Hintergrundbilder/Bildwelten je Rubrik ändern, ohne Code zu berühren.

**Prompt-Vorschlag:**
> Baue im Erstellerbereich eine einfache Oberfläche, über die ich pro Rubrik das Hintergrundbild bzw. die Bildwelt austauschen kann – ähnlich wie ein WordPress-Theme-Editor, aber reduziert auf Bild-Uploads/Auswahl statt Code. Die Bilder sollen aus meinem OneDrive ausgewählt werden können.

**Worauf achten:**
- Lässt sich ein neues Bild wirklich mit wenigen Klicks setzen, ohne dass etwas anderes am Layout kaputtgeht?
- Ist sofort sichtbar (Vorschau), wie die Änderung in der Nutzeransicht aussieht, bevor sie live geht?

---

## Phase 3: Plattform-Anbindung & Kerninhalte

### Schritt 3.1 – YouTube- und Instagram-Anbindung
**Ziel:** Im Erstellerbereich Konten verknüpfen, sodass dort hochgeladene Videos automatisch zur Auswahl stehen.

**Prompt-Vorschlag:**
> Baue im Erstellerbereich eine Funktion, um mein YouTube-Konto und mein Instagram-Konto zu verknüpfen. Nach der Verknüpfung sollen meine dort vorhandenen Videos in einer Liste erscheinen, aus der ich auswählen kann, welches Video ich in welcher Rubrik/Kategorie auf meiner Website zeigen will.

> *Hinweis: Bitte vorher Offene Frage 4 beantworten, falls noch weitere Plattformen außer YouTube/Instagram verknüpft werden sollen.*

**Das machst du:** Beim erstmaligen Verknüpfen wirst du zu YouTube bzw. Instagram weitergeleitet und bestätigst dort einmalig den Zugriff (Login + "Erlauben"-Klick). Ich sage dir, wann genau das im Ablauf passiert.

**Worauf achten:**
- Werden tatsächlich nur Videos aus den verknüpften Konten gezogen (nichts Fremdes)?
- Lässt sich die Verbindung bei Bedarf wieder trennen?

---

### Schritt 3.2 – Erstellerbereich: Upload-Grundfunktion (Texte/Bilder/Kategorien)
**Ziel:** Funktionierendes Upload-Formular für Text- und Bildinhalte, inkl. Kategorie-Zuordnung und OneDrive-Anbindung.

**Prompt-Vorschlag:**
> Baue im Erstellerbereich ein Upload-Formular für neue Inhalte. Felder: Titel, Textinhalt, Bildauswahl (aus OneDrive), Auswahl des verknüpften Videos (aus Schritt 3.1, falls relevant), Auswahl der Rubrik. Ergänze ein Häkchen-Feld „Auch im Feuilleton anzeigen" für Texte aus anderen Rubriken, die zusätzlich dort erscheinen sollen.

**Worauf achten:**
- Werden Bilder wirklich aus OneDrive geladen, nicht erneut hochgeladen?
- Erscheint ein für Feuilleton markierter Eintrag korrekt an beiden Stellen?

---

### Schritt 3.3 – Kategorien-System: Anlegen & Mehrfachzuordnung
**Ziel:** Eigene Kategorien pro Rubrik anlegen; Inhalte mehreren Kategorien gleichzeitig zuordnen.

**Prompt-Vorschlag:**
> Erweitere den Erstellerbereich um eine Kategorienverwaltung pro Rubrik: Kategorien anlegen, bearbeiten, löschen. Im Upload-Formular soll eine Mehrfachauswahl ergänzt werden, mit der ich einen Inhalt mehreren Kategorien gleichzeitig zuordnen kann.

**Worauf achten:**
- Lassen sich Kategorien wirklich frei benennen?
- Werden Kategorien pro Rubrik getrennt verwaltet?

---

### Schritt 3.4 – Sortier-/Darstellungsmodi: Chronologisch, Thematisch, Visuell
**Ziel:** Umschalter zwischen den drei Standardmodi in jeder Rubrik; Möglichkeit, weitere Modi zu ergänzen.

**Prompt-Vorschlag:**
> Baue für jede der fünf Rubriken einen Umschalter mit den drei vordefinierten Modi „Chronologisch", „Thematisch", „Visuell". Ergänze im Erstellerbereich die Option „Kategorisierungsmethode hinzufügen", mit der ich einen weiteren, frei benennbaren Modus ergänzen kann.

**Worauf achten:**
- Funktioniert der Umschalter konsistent in allen 5 Rubriken?
- Wirkt „Visuell" wirklich visuell (Bildkacheln) im Unterschied zu den anderen Modi?

---

### Schritt 3.5 – Globus-Visualisierung (Radreise-Videotagebuch)
**Ziel:** Stilisierte 3D-Globus-Ansicht mit Strecke und klickbaren Video-Pins, plus die drei Wege zur Streckenangabe beim Upload.

**Prompt-Vorschlag:**
> Baue für das Radreise-Videotagebuch eine stilisierte 3D-Globus-Ansicht, deren Optik sich an Streckenregion, Videoinhalten und unserem Website-Design orientiert (kein fotorealistischer Globus). Im Upload-Formular für Radreise-Videos ergänze drei wählbare Optionen zur Streckenangabe: A) Start/Ziel-Ort + App + Verkehrsmittel, woraus die Route automatisch berechnet wird, B) Hochladen einer Export-Datei der Strecke (GPX-Format bevorzugt), C) ein direkter Link zu Komoot, Google Maps oder Bergfex. Die jeweilige Route soll automatisch als Linie mit anklickbarem Video-Punkt auf dem Globus erscheinen. Ergänze die zwei alternativen Ansichten „Zeitlich" und „Nach Klickzahl" mit Umschalt-Buttons zwischen allen drei Ansichten.

**Worauf achten:**
- Funktionieren wirklich alle drei Eingabewege (A/B/C) zuverlässig, auch wenn du nur einen davon nutzt?
- Sind die Video-Punkte auf dem Globus klar erkennbar und anklickbar, auch wenn später viele Punkte hinzukommen?
- Bleibt die Performance akzeptabel?

---

### Schritt 3.6 – Blog-Funktion (Radreise) inkl. Suche & freie Kategorien
**Ziel:** Blog-Ansicht mit chronologischer Standardsortierung, Volltextsuche, frei definierbaren Kategorien, Einbindung von OneDrive-Bildern und verknüpften Videos.

**Prompt-Vorschlag:**
> Baue die Blog-Ansicht der Rubrik Radreise. Standardmäßig erscheinen Einträge chronologisch (neueste zuerst). Ergänze ein Suchfeld für Volltextsuche sowie ein Filtermenü mit den im Erstellerbereich definierten Kategorien. Blogeinträge müssen Bilder aus OneDrive und eingebettete Videos (YouTube/Instagram) im Text darstellen können.

**Worauf achten:**
- Funktioniert die Suche zuverlässig über alle Blogtexte?
- Werden OneDrive-Bilder und eingebettete Videos lesefreundlich im Fließtext dargestellt?

---

### Schritt 3.7 – Existenziell: Freier Upload-Bereich
**Ziel:** Formloser Upload-Bereich für Bilder/Texte/Sonstiges (ohne Zeichenblock).

**Prompt-Vorschlag:**
> Baue den Bereich „Existenziell" als freien Upload-Bereich, in dem ich Bilder, Texte und andere Inhalte ohne feste Struktur ablegen kann, mit Anbindung an OneDrive für Bilder/Dokumente.

**Worauf achten:**
- Fühlt sich der Bereich wirklich „frei" an und nicht in ein starres Schema gepresst?

---

### Schritt 3.8 – Gedichte: Sortierung nach Lebensabschnitt + freie Sortierungen
**Ziel:** Standardsortierung nach Lebensabschnitt, zusätzlich frei definierbare Sortiermodi.

**Prompt-Vorschlag:**
> Baue die Gedichte-Ansicht mit einer Standardsortierung nach Lebensabschnitt (chronologisch). Ergänze die gleiche Möglichkeit wie beim Blog, weitere Sortier-/Kategorisierungsmodi im Erstellerbereich selbst zu definieren und Gedichten zuzuordnen.

**Worauf achten:**
- Ist „Lebensabschnitt" klar von den Standardmodi (Chronologisch/Thematisch/Visuell) unterscheidbar?
- Lassen sich neue Lebensabschnitte einfach ergänzen, ohne bestehende Gedichte neu einsortieren zu müssen?

---

### Schritt 3.9 – Rezepte und Sauerteig-Theorie (Backen)
**Ziel:** Strukturierte Darstellung eigener Rezepte und der Sauerteig-Theorie-Texte.

**Prompt-Vorschlag:**
> Baue die Bereiche „Eigene Rezepte" und „Theorie über Sauerteigbacken" innerhalb der Rubrik Backen. [Je nach Antwort auf Offene Frage 5: „Rezepte sollen Zutatenliste + Schritt-für-Schritt-Anleitung mit anpassbaren Mengen haben" ODER „Rezepte sollen wie freie Blogtexte mit Bildern funktionieren."] Theorie-Texte funktionieren wie der Blog: chronologisch mit Suchfunktion und Kategorien.

**Worauf achten:**
- Passt das gewählte Format wirklich zu deinem tatsächlichen Schreibstil bei Rezepten (eher Liste oder eher Erzählung)?

---

## Phase 4: Inhalte (echte Content-Einpflege)

### Schritt 4.1 – Erste echte Inhalte einpflegen
**Ziel:** Mit echten Inhalten aus YouTube/Instagram/OneDrive die komplette Kette einmal durchspielen.

**Prompt-Vorschlag:**
> Ich pflege jetzt einen ersten echten Inhalt über den Erstellerbereich ein: [konkrete Angabe – z. B. ein Radreise-Video mit Streckenangabe, oder ein Blogtext mit Bild]. Begleite mich Schritt für Schritt und zeige mir danach, wie er sich in der Nutzeransicht in allen relevanten Sortiermodi darstellt.

**Worauf achten:**
- Werden Video, Bild und Text korrekt aus den jeweiligen verknüpften Quellen (YouTube/Instagram/OneDrive) gezogen?
- Stimmen Kategorie- und Sortiermodus-Zuordnung mit der Eingabe überein?

---

## Phase 5: Feinschliff & Testing

### Schritt 5.1 – Konsistenzprüfung über alle Rubriken
**Ziel:** Navigation, Design und Kernfunktionen funktionieren in allen 5 Rubriken einheitlich.

**Prompt-Vorschlag:**
> Gehe alle fünf Rubriken durch und prüfe, ob Navigation, Design, Kategorienverwaltung und die drei Sortiermodi überall konsistent funktionieren. Liste mir Unstimmigkeiten oder fehlende Funktionen auf.

**Worauf achten:**
- Gibt es Rubriken, in denen einzelne Funktionen fehlen oder abweichend funktionieren?
- Ist die individuelle Sonderstruktur jeder Rubrik (Globus bei Radreise, Magazin-Stil bei Feuilleton) weiterhin erhalten?

---

### Schritt 5.2 – Responsive- & Nutzerfreundlichkeitsprüfung
**Ziel:** Die Seite funktioniert auf verschiedenen Bildschirmgrößen und ist für Besucher intuitiv nutzbar.

**Prompt-Vorschlag:**
> Prüfe die gesamte Website auf Darstellung in unterschiedlichen Bildschirmgrößen (Mobil/Tablet/Desktop) und auf intuitive Bedienbarkeit für einen Besucher, der die Seite zum ersten Mal sieht. Schlage Verbesserungen vor, falls Bedienung oder Darstellung unklar sind.

**Worauf achten:**
- Bleiben Globus-Visualisierung und Sortiermodi auch auf kleinen Bildschirmen bedienbar?
- Findet ein neuer Besucher ohne Erklärung die Hauptinhalte jeder Rubrik?

---

### Schritt 5.3 – Erstellerbereich-Abschlusstest
**Ziel:** Den kompletten Upload-Workflow einmal vollständig end-to-end durchspielen, inklusive Plattform-Anbindungen.

**Prompt-Vorschlag:**
> Lass uns den kompletten Workflow einmal durchspielen: Ich lege einen neuen Inhalt mit Video aus YouTube, Bild aus OneDrive und Streckenangabe an, weise ihn zwei Kategorien zu und prüfe, ob er korrekt in allen Sortiermodi und ggf. zusätzlich im Feuilleton erscheint. Begleite mich Schritt für Schritt und weise auf eventuelle Fehler hin.

**Worauf achten:**
- Erscheint der neue Inhalt wirklich überall dort, wo er laut Zuordnung erscheinen sollte?
- Gibt es Stellen im Workflow, die für dich als Ersteller umständlich oder unklar sind?

---

### Schritt 5.4 – Live-Check & Übergabe
**Ziel:** Die fertige Seite unter der eigenen Domain final prüfen.

**Prompt-Vorschlag:**
> Die Seite läuft jetzt unter [deine Domain]. Geh noch einmal komplett durch, prüfe Ladezeiten, kaputte Links und ob alle externen Anbindungen (YouTube, Instagram, OneDrive, Routing) im Live-Betrieb stabil funktionieren.

**Worauf achten:**
- Lädt die Seite auch ohne dass du selbst eingeloggt bist (echte Besucher-Perspektive)?
- Funktionieren alle externen Verknüpfungen auch nach ein paar Tagen noch (manche Zugriffstoken laufen ab und müssen ggf. erneuert werden – das zeige ich dir, falls es passiert)?

---

## Hinweis zur Arbeitsweise

Arbeite die Schritte **in der angegebenen Reihenfolge** ab. Gib nach jedem Schritt kurzes Feedback, bevor wir weitermachen – das vermeidet, dass sich Fehler durch mehrere Phasen hindurchziehen.

Bei Schritten mit Verweis auf eine **Offene Frage**: bitte kurz vorher klären, das reduziert Nachbesserungsbedarf erheblich.

Bei **"Das machst du"**-Abschnitten: Ich sage dir jeweils erst kurz vorher, exakt welche Klicks nötig sind – du musst dir jetzt noch nichts davon merken.
