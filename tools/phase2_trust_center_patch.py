from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
INDEX=ROOT/"index.html"
CSS='<link rel="stylesheet" href="assets/trust-center.css?v=20260928a">'
JS='<script defer src="assets/trust-center.js?v=20260928a"></script>'
OLD_EMAIL='arifmuhamad942@gmail.com'
NEW_EMAIL='arifmuhamad94@gmail.com'

def main():
    html=INDEX.read_text(encoding="utf-8")

    protected=[
        'https://assistant.vireqo.id/client.js',
        'data-client-id="jelnusa-staging"',
        'assets/mobile-recovery.css?v=20260928',
        'assets/language-mobile-hotfix.js?v=20260928g',
        'assets/ui-motion-polish.js?v=20260928b',
    ]
    for token in protected:
        if token not in html:
            raise RuntimeError(f"Protected token missing: {token}")

    html=html.replace(OLD_EMAIL,NEW_EMAIL)

    if CSS not in html:
        pos=html.lower().rfind("</head>")
        if pos<0:
            raise RuntimeError("Missing </head>; refusing patch")
        html=html[:pos]+CSS+"\n"+html[pos:]

    if JS not in html:
        pos=html.lower().rfind("</body>")
        if pos<0:
            raise RuntimeError("Missing </body>; refusing patch")
        html=html[:pos]+JS+"\n"+html[pos:]

    if html.count(CSS)!=1 or html.count(JS)!=1:
        raise RuntimeError("Trust Center assets must occur exactly once")
    if OLD_EMAIL in html:
        raise RuntimeError("Old contact email still present in index.html")

    INDEX.write_text(html,encoding="utf-8")

    # Keep locale source files consistent if the old address appears there.
    for p in (ROOT/"locales").glob("*.json"):
        s=p.read_text(encoding="utf-8")
        if OLD_EMAIL in s:
            p.write_text(s.replace(OLD_EMAIL,NEW_EMAIL),encoding="utf-8")

    print("PASS: Trust Center wired and contact email normalized")

if __name__=="__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE2_PATCH_FAIL: {exc}",file=sys.stderr)
        raise
