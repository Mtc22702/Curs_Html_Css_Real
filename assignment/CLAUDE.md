# Curs HTML/CSS/JS — Compiti (LinkAcademy)

## Contesto IMPORTANTE
Questi sono i **compiti che invio al professore** del corso Frontend Developer (LinkAcademy).
Sono uno **studente** in fase di apprendimento. Quindi:

- Il codice deve riflettere il **mio livello attuale** e ciò che è stato spiegato in quella lezione.
- **NON introdurre tecniche non ancora studiate** in quella cartella. Esempio: se la lezione usa cicli `for`, non riscrivere con `.map()/.reduce()/.filter()`; se non si è ancora visto `async/await`, non usarlo.
- **Spiega sempre** cosa fai e perché — sto imparando, non voglio solo il risultato. Preferisco capire l'errore piuttosto che avere codice "magico".
- Mantieni lo **stile semplice e leggibile** che un professore si aspetta di valutare (commenti in romeno, nomi di variabili chiari).
- Quando correggi un mio errore, dimmi qual era l'errore concettuale, non solo la riga giusta.

## Struttura: ogni sottocartella = una consegna
| Cartella | Argomento | Stack |
|----------|-----------|-------|
| `1` – `5` | HTML e CSS base | HTML/CSS puro |
| `6_bootstrap` | Bootstrap 5.3 (CDN) | usa `homepage.html`, `assets/` |
| `7_figma` | Implementare da design Figma | HTML/CSS |
| `8_refactoring` | Separare CSS in file modulari | CSS organizzato per pagina |
| `9_javascript` | JS base: variabili, funzioni, `typeof`, cicli | `js/main.js` (~92 righe) |
| `10_javascript` | JS: array di oggetti, calcolo stock, ricerca | `js/main.js` (~224 righe) |
| `11_javascript_git` | Come la 10 + primo repo Git + README | + `.git`, `README.md` |

## Struttura file (dalla lezione 8 in poi)
```
[lezione]/
  homepage.html / index.html
  catalog.html · product.html · reduceri.html · about.html
  login.html · register.html · cart.html · checkout.html · orders.html
  css/
    global.css      ← :root con variabili, palette GRIGIO/NERO + accento VERDE carrello
    home.css · catalog.css · product.css · auth.css
    about.css · checkout.css · orders.css
  js/
    main.js         ← UNICO file JS, codice procedurale didattico
  images/
```
> Nota: palette diversa da Adarta (qui grigio/nero, lì blu/oro). Non confondere i due progetti.

## Stile del codice JavaScript atteso (lezioni 9-11)
- Procedurale e didattico: `const`/`let`, funzioni con `function nome() {}`
- Cicli `for` classici (non ancora array methods, salvo se la lezione lo richiede)
- `document.getElementById`, `alert()`, `console.log()` per dimostrare i risultati
- Funzioni piccole e con una sola responsabilità, commentate
- Niente framework JS, niente librerie, niente moduli ES import/export

## Regole operative
- Lavora SOLO nella sottocartella della consegna corrente. **Mai modificare lezioni precedenti** (sono già consegnate/valutate).
- Rispetta le convenzioni già presenti in quella cartella.
- Bootstrap: usa le classi del framework, aggiungi CSS custom solo se necessario in `global.css` o nel CSS della pagina.
- Lezione 11+: dopo modifiche significative proponi un commit Git con messaggio chiaro (in romeno).
- Verifica sempre: nessun errore in console, link relativi corretti, `alt` sulle immagini.

## Relazione con il progetto personale
Il sito personale **Adarta Detailing Auto** (`/Users/matteocardelli/LinkAcademy/Adarta_Detailing_website/`)
è la versione "vera" che costruisco in parallelo applicando ciò che imparo qui.
Quando un compito tocca un argomento, posso poi portarlo (in versione più curata) in quel progetto.
