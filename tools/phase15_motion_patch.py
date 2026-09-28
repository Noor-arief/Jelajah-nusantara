from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
INDEX=ROOT/"index.html"

CSS='<link rel="stylesheet" href="assets/ui-motion-polish.css?v=20260928a">'
OLD_JS='<script defer src="assets/ui-motion-polish.js?v=20260928a"></script>'
JS='<script defer src="assets/ui-motion-polish.js?v=20260928b"></script>'

def main():
    html=INDEX.read_text(encoding="utf-8")

    protected=[
        'https://assistant.vireqo.id/client.js',
        'data-client-id="jelnusa-staging"',
        'assets/mobile-recovery.css?v=20260928',
        'assets/language-mobile-hotfix.js?v=20260928g',
    ]
    for token in protected:
        if token not in html:
            raise RuntimeError(f"Protected token missing: {token}")

    if CSS not in html:
        pos=html.lower().rfind("</head>")
        if pos<0:
            raise RuntimeError("Missing </head>; refusing patch")
        html=html[:pos]+CSS+"\n"+html[pos:]

    if OLD_JS in html:
        html=html.replace(OLD_JS,JS,1)
    elif JS not in html:
        pos=html.lower().rfind("</body>")
        if pos<0:
            raise RuntimeError("Missing </body>; refusing patch")
        html=html[:pos]+JS+"\n"+html[pos:]

    if html.count(CSS)!=1 or html.count(JS)!=1:
        raise RuntimeError("Phase 1.5 asset markers must occur exactly once")
    if OLD_JS in html:
        raise RuntimeError("Old Phase 1.5 JS cache key still present")

    INDEX.write_text(html,encoding="utf-8")
    print("PASS: localized NUSA callout asset wired exactly once")

if __name__=="__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE15_PATCH_FAIL: {exc}",file=sys.stderr)
        raise
