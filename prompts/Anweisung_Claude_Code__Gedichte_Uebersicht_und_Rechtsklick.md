# Anweisung an Claude Code: Gedichte-Übersicht, Vorschau-Mechanik und Rechtsklick-Funktion

## Kontext
Diese Anweisung ergänzt PROJECT_SPEC.md (Abschnitt 9, Rubrik Gedichte) um konkrete Anforderungen
an die Übersichtsdarstellung und einen neuen, in der Spezifikation noch nicht vorgesehenen
Bearbeitungsmechanismus im Erstellerbereich.

## 1. Grundprinzip: Jedes Gedicht ist individuell frei gestaltbar

Wie bereits an anderer Stelle festgehalten: jedes Gedicht soll im Erstellerbereich frei gestaltet
werden können (freies Canvas-Werkzeug, vergleichbar mit Figma/Canva — kein tabellenartiges
Werkzeug, keine Festlegung auf ein starres Textfeld-Template). Diese Anweisung baut darauf auf
und betrifft zusätzlich die Übersichtsseite, auf der alle Gedichte gelistet werden.

## 2. Drei getrennte Designebenen — Box einheitlich, Inhalt individuell, Kategorien mit Stimmungsbildern

Florian hat die Architektur in drei klar getrennte Ebenen präzisiert, die nicht verwechselt
werden dürfen:

**Ebene 1 — Vorschau-Box/Rahmen: einheitlich für alle Gedichte.**
Die äußere Form der Vorschau-Kachel ist für jedes Gedicht gleich gestaltet: ein einheitlicher,
handschriftlich/handgezeichnet wirkender Rahmen (unregelmäßige Linienführung statt scharfkantigem
digitalem Rechteck). Dies ist Teil der einheitlichen Navigationsgestaltung der Rubrik, nicht
individuell pro Gedicht.

**Ebene 2 — Inhalt innerhalb der Box: individuell pro Gedicht.**
Innerhalb der einheitlichen Box erscheinen Überschrift und ein manuell ausgewählter Satz (siehe
Punkt 3 unten) — nur diese beiden Inhalte übernehmen die individuelle Typografie und Farbgebung
des jeweiligen Gedichts. Die Hintergrundfarbe(n) aus dem Gedicht-Layout werden in die Box
übernommen. Der vollständige Gedichttext erscheint hier naturgemäß nicht — nur Überschrift und
der eine ausgewählte Satz.

**Ebene 3 — Unterkategorien-Auswahl: eigene Logik mit Stimmungsbildern.**
Für die Auswahl der Unterkategorien (z. B. thematische Gruppen wie "Sehnsucht" oder "Frühling" —
die genaue Kategorisierungsstruktur wird an anderer Stelle im Projekt geklärt, siehe Punkt 5)
gilt eine eigene Darstellungslogik:
- Handschriftliche Typografie für die Kategorie-Bezeichnung (gleiche Schriftfamilie wie sonst
  in der Rubrik, siehe Punkt 4).
- Ein **Stimmungsbild** pro Kategorie, das die Atmosphäre der Kategorie einfängt (nicht wörtlich
  illustrierend, sondern stimmungstragend).
- Dieselbe einheitliche, handgezeichnete Kasten-Form wie bei den Gedicht-Vorschau-Kacheln
  (Ebene 1) — nur der Inhalt im Kasten unterscheidet sich (hier: Bezeichnung + Stimmungsbild
  statt Überschrift + Satz).

**Vollständiger Navigationsfluss:**
Startseite Gedichte → Kategorien-Übersicht (handschriftliche Bezeichnung + Stimmungsbild, im
einheitlichen Kasten) → Klick auf Kategorie → Liste der Gedichte dieser Kategorie (Überschrift +
ausgewählter Satz, individuelles Design pro Gedicht, im selben einheitlichen Kasten-Rahmen) →
Klick auf einzelnes Gedicht → vollständiges, frei gestaltetes Gedicht (Canvas-System, siehe
Punkt 1).

## 3. Manuelle Auswahl des Vorschau-Satzes — neue Funktion im Erstellerbereich

Florian möchte selbst bestimmen, welcher Satz aus dem jeweiligen Gedicht in der
Übersichts-Vorschau angezeigt wird. Das ist **keine automatische Auswahl** (z. B. nicht
automatisch der erste Satz), sondern eine manuelle, bewusste Entscheidung pro Gedicht.

**Gewünschter Bedienablauf:**
1. Florian befindet sich im Bearbeitungsbereich/Canvas eines einzelnen Gedichts (Erstellerbereich).
2. Er markiert einen Satz innerhalb des Gedichttexts.
3. Er macht einen **Rechtsklick** auf die Markierung.
4. Es erscheint ein **eigenes Kontextmenü** (nicht das Standard-Browser-Rechtsklickmenü) mit
   mindestens der Option **"Als Canvas-Text auswählen"**.
5. Nach Klick auf diese Option wird der markierte Satz als der Satz festgelegt, der künftig in
   der Übersichts-Vorschau für dieses Gedicht angezeigt wird.

**Technische Anforderungen, die sich daraus ergeben:**
- Ein **custom Kontextmenü** muss implementiert werden, das das native Browser-Kontextmenü
  innerhalb der Editierfläche überschreibt (üblich z. B. über das `contextmenu`-Event in
  JavaScript, `event.preventDefault()` auf das native Menü, dann ein eigenes UI-Element
  einblenden).
- Ein **Datenfeld pro Gedicht** muss existieren, das den aktuell ausgewählten Vorschau-Satz
  persistent speichert (z. B. als zusätzliches Feld in der Inhalte-Tabelle oder einer
  gedicht-spezifischen Zusatztabelle — abhängig davon, wie das freie Canvas-Layout insgesamt
  gespeichert wird, siehe Punkt 1 und die an anderer Stelle dokumentierten offenen Fragen zum
  Datenmodell für freies Layout).
- Die Funktion sollte nur innerhalb der Editieroberfläche (Erstellerbereich) verfügbar sein,
  nicht in der öffentlichen Lesefassung des Gedichts.

Diese Funktion ist in der bestehenden PROJECT_SPEC.md nicht vorgesehen und sollte als
eigenständiger kleiner Funktionsblock geplant werden, idealerweise nachdem das grundsätzliche
freie Canvas-Layout-System für einzelne Gedichte bereits funktionsfähig ist (da die
Rechtsklick-Funktion auf der Existenz dieses Canvas-Systems aufbaut).

## 4. Typografie: Handschrift durchgängig, mit Lesbarkeits-Anforderung

Die für die Gedichte-Rubrik vorgesehene Handschrift-Typografie (ursprünglich aus dem
Stift-Schreib-Übergang auf dem Startbildschirm abgeleitet, siehe separate Anweisung zum
Startbildschirm-Navigationskonzept) gilt **durchgängig** für die gesamte Gedichte-Rubrik —
also nicht nur für Überschriften, sondern auch für den eigentlichen Gedichttext und die
Vorschau-Sätze in der Übersicht.

**Wichtige Einschränkung: Die Schrift muss gut lesbar bleiben.** Das schließt rein dekorative,
schwer lesbare Script-/Handschrift-Webfonts aus, auch wenn sie optisch näher an einer "echten"
handgeschriebenen Anmutung liegen würden. Bei der Auswahl oder Erstellung der Schriftart sollte
Lesbarkeit über längere Fließtext-Passagen (ganze Gedichte, nicht nur kurze Titel) als
Kriterium geprüft werden — am besten durch einen praktischen Lesbarkeitstest mit echtem
Gedichttext in verschiedenen Schriftgrößen, bevor die Schrift final festgelegt wird.

Zusätzlich sollen auch grafische/strukturelle Elemente (Rahmen, Trennlinien etc.) innerhalb der
Gedichte-Rubrik eine handgezeichnete, leicht unregelmäßige Linienästhetik haben, nicht nur der
Text selbst (siehe Punkt 2 zur Vorschau-Kachel).

## 5. Ausdrücklich nicht Teil dieser Anweisung: Kategorisierung/Unterrubriken

Florian hat mögliche Unterkategorien für Gedichte genannt (Beispiele: Existenz, Stolz, Sehnsucht,
Gebrochen, Frühling), aber ausdrücklich gesagt, dass die Kategorisierung selbst an anderer
Stelle im Projekt geklärt wird. Diese Anweisung behandelt ausschließlich die visuelle
Vorschau-Mechanik und die Rechtsklick-Funktion, nicht die Frage, wie/ob Gedichte nach Themen
kategorisiert werden. Claude Code sollte hierzu keine Architekturentscheidungen vorwegnehmen.
