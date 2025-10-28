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

## Poznámky

- Všechny hry běží na klientovi.
- Pro GitHub Pages se používá GitHub Actions pro automatické nasazení.
- Hry se spouští v modálním okně.
