from pathlib import Path

import pdfplumber


SOURCE_DIR = Path(
    "/Users/matteocardelli/Desktop/Curs Link Academy/"
    "Pagini curs Link Academy ordonate si complete 12.08.2026/"
    "07 - Modul - 3 - Comunicarea cu serverul si lucrul cu serviciile API"
)
OUTPUT_DIR = Path("tmp/pdfs/course_text")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


for pdf_path in sorted(SOURCE_DIR.glob("*.pdf")):
    with pdfplumber.open(pdf_path) as document:
        text = "\n\n".join(page.extract_text() or "" for page in document.pages)

    output_path = OUTPUT_DIR / f"{pdf_path.stem}.txt"
    output_path.write_text(text, encoding="utf-8")
    print(f"{pdf_path.name}: {len(text)} caratteri")
