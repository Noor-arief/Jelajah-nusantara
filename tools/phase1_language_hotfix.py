from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
OLD = '<script defer src="assets/language-mobile-hotfix.js?v=20260928d"></script>'
NEW = '<script defer src="assets/language-mobile-hotfix.js?v=20260928e"></script>'

def main():
    html = INDEX.read_text(encoding="utf-8")

    required = [
        'id="jelLanguageSwitcher"',
        '.jl-language-backdrop',
        'id="navBackdrop"',
        'assets/mobile-recovery.css?v=20260928',
        'https://assistant.vireqo.id/client.js',
        'data-client-id="jelnusa-staging"',
    ]
    for token in required:
        if token not in html:
            raise RuntimeError(f"Required protected token missing: {token}")

    if OLD in html:
        html = html.replace(OLD, NEW, 1)
    elif NEW not in html:
        closing = html.rfind("</body>")
        if closing < 0:
            raise RuntimeError("Missing </body>; refusing unsafe patch")
        html = html[:closing] + NEW + "\n" + html[closing:]

    if html.count(NEW) != 1:
        raise RuntimeError("Language hotfix marker must occur exactly once")

    INDEX.write_text(html, encoding="utf-8")
    print("PASS: language hotfix v5 wired with cache-busting version")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE1_LANGUAGE_HOTFIX_FAIL: {exc}", file=sys.stderr)
        raise
