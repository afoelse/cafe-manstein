# Manstein — Café · Bistro · Bar

Static website for **Manstein Café Bistrot**, Witzlebenstraße 32, 14057 Berlin-Charlottenburg.
Classic, clean editorial design (cream + bottle green + brass) built with plain HTML, CSS and JS — no build step.

## Lokal ansehen

Im Projektordner einen einfachen Webserver starten und im Browser öffnen:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 aufrufen
```

## Dateien

- `index.html` — die komplette Seite (Hero, Willkommen, Küche, Karte, Galerie, Besuch, Footer)
- `impressum.html` / `datenschutz.html` — Rechtsseiten (im Footer verlinkt)
- `styles.css` — Gestaltung (Palette, Typografie, Layout, Responsive)
- `script.js` — Navigation, Scroll-Reveals, Lightbox, Google-Maps-Cookie-Consent
- `manstein-logo-full.png` / `manstein-logo-mono.png` — das echte Logo als Alpha-Maske (wird per CSS je Bereich umgefärbt)
- `manstein-logo-source.png` — Original-Logo (weiß auf grün)
- `favicon.png` — Browser-Tab-Icon
- `2026_manstein0X.jpg`, `2026_menu_manstein.webp` — Fotos & Getränkekarte

## Offen / To-do

- `impressum.html` und `datenschutz.html` sind angelegt, enthalten aber noch **Platzhalter** (im Text mit ⚑ markiert und farbig hervorgehoben), die ergänzt werden müssen — u. a. Rechtsform, Registergericht, Hosting-Anbieter. Beide Seiten sollten vor Veröffentlichung rechtlich geprüft werden.
- Schriften (Cormorant Garamond, Inter) werden von Google Fonts geladen; für reinen Offline-Betrieb bzw. um die Datenübertragung an Google zu vermeiden, lokal einbinden (siehe Hinweis in der Datenschutzerklärung).
