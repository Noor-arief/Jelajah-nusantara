from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
MARKER = '<script defer src="assets/language-mobile-hotfix.js?v=20260928"></script>'

def main():
    html = INDEX.read_text(encoding="utf-8")

    required = [
        'id="jelLanguageSwitcher"',
        'class="jl-language-backdrop"',
        'assets/mobile-recovery.css?v=20260928',
        'https://assistant.vireqo.id/client.js',
        'data-client-id="jelnusa-staging"',
    ]
    for token in required:
        if token not in html:
            raise RuntimeError(f"Required protected token missing: {token}")

    if MARKER not in html:
        closing = html.rfind("</body>")
        if closing < 0:
            raise RuntimeError("Missing </body>; refusing unsafe patch")
        html = html[:closing] + MARKER + "\n" + html[closing:]

    if html.count(MARKER) != 1:
        raise RuntimeError("Language hotfix marker must occur exactly once")

    INDEX.write_text(html, encoding="utf-8")

    print("PASS: isolated language selector hotfix wired exactly once")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE1_LANGUAGE_HOTFIX_FAIL: {exc}", file=sys.stderr)
        raise
