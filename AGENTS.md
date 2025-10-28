# AGENTS.md - Průvodce pro vývoj her v VB Games

Tento dokument popisuje standardy, styly a strukturu pro vývoj her v tomto repozitáři.

## Struktura hry

Každá hra má vlastní adresář v `games/`, např. `games/space-invaders/`.

V každém adresáři hry:
- `index.html` - HTML struktura hry
- `style.css` - Styly pro hru
- `script.js` - JavaScript logika hry

Hry používají čistý JavaScript bez frameworků.

## Styl kódu

- Používejte camelCase pro proměnné a funkce.
- Komentujte složitější části kódu.
- Držte se principů čistého kódu.

## Commitování

Používejte conventional commits:
- `feat:` pro nové funkce (např. nová hra)
- `fix:` pro opravy chyb
- `docs:` pro dokumentaci
- `style:` pro stylování
- `refactor:` pro refaktorování

Příklady:
- `feat: add Space Invaders game`
- `fix: correct scoring in Pong`

## Přidávání nové hry

1. Vytvořte nový adresář v `games/`.
2. Implementujte hru s index.html, style.css, script.js.
3. Přidejte hru do pole `games` v hlavním `script.js`.
4. Commitujte s `feat: add [název hry]`.

## Responzivnost her

- Používejte škálování canvas pomocí CSS transform: scale() nebo nastavení width/height v px po výpočtu škály.
- Základní rozměry (např. 600x400) škálujte podle kontejneru, ale pouze zmenšujte, ne zvětšujte.
- Používejte BASE_WIDTH a BASE_HEIGHT pro logiku, škálování pro zobrazení.

## Modální okna a UX

- Hry se spouští v iframe uvnitř modal-content s tmavým pozadím a padding.
- Modal má tmavý gradient background, modal-content transparent s padding 10px.
- Zavírání modalu: Esc klávesa, křížek vpravo nahoře.
- Klávesové ovládání menu: šipky pro navigaci (přidání/odebrání class 'selected'), Enter pro výběr.
- Používejte postMessage pro komunikaci z iframe do parent (např. zavření modalu).

## Stylování

- Moderní tmavý theme: gradients (linear-gradient), rgba pro průhlednost, blur efekty.
- Tlačítka: rounded, gradient, hover efekty s transform a box-shadow.
- Hry: tmavé pozadí, kulaté rohy na canvas a kontejner.
- Alert okna: vlastní modal místo window.alert, tmavý design.

## Implementace

- Používejte iframe místo innerHTML pro načítání her, aby fungovaly scripty.
- Dev server: upravte na no-cache headers pro okamžité změny.
- Game loop: zastavte při game over pomocí gameRunning flag.
- Debug: používejte alerty pro kontrolu eventů a stavů.

## Poznámky

- Všechny hry běží na klientovi.
- Pro GitHub Pages se používá GitHub Actions pro automatické nasazení.
- Hry se spouští v modálním okně.
