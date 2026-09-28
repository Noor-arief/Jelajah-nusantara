from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
INDEX=ROOT/"index.html"

CSS='<link rel="stylesheet" href="affiliate/affiliate-ui.css?v=20260928a">'
CONFIG='<script defer src="affiliate/affiliate-config.js?v=20260928a"></script>'
ENGINE='<script defer src="affiliate/affiliate-engine.js?v=20260928a"></script>'
BRIDGE='<script defer src="affiliate/affiliate-card-integration.js?v=20260928a"></script>'

def insert_before(html, marker, value):
    if value in html:
        return html
    pos=html.lower().rfind(marker.lower())
    if pos<0:
        raise RuntimeError(f"Missing marker {marker}")
    return html[:pos]+value+"\n"+html[pos:]

def main():
    html=INDEX.read_text(encoding="utf-8")
    protected=[
        'https://assistant.vireqo.id/client.js',
        'data-client-id="jelnusa-staging"',
        'assets/ui-motion-polish.js?v=20260928b',
        'assets/trust-center.js?v=20260928a',
    ]
    for token in protected:
        if token not in html:
            raise RuntimeError(f"Protected token missing: {token}")

    html=insert_before(html,"</head>",CSS)
    for script in [CONFIG,ENGINE,BRIDGE]:
        html=insert_before(html,"</body>",script)

    for token in [CSS,CONFIG,ENGINE,BRIDGE]:
        if html.count(token)!=1:
            raise RuntimeError(f"Phase 4 asset marker count invalid: {token}")

    INDEX.write_text(html,encoding="utf-8")
    print("PASS: Phase 4 affiliate card assets wired exactly once")

if __name__=="__main__":
    try:
        main()
    except Exception as exc:
        print(f"PHASE4_PATCH_FAIL: {exc}",file=sys.stderr)
        raise
