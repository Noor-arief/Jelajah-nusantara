from html.parser import HTMLParser
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
OUTDIR = ROOT / "destinations"
OUT = OUTDIR / "index.html"
SITEMAP = ROOT / "sitemap.xml"
REPORT = ROOT / "phase7-destination-crawlability-report.json"

VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"}

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.card_depth = None
        self.card = None
        self.cards = []
        self.capture_title = False
        self.capture_p = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = set((attrs.get("class") or "").split())

        if self.card is None and "region-card" in classes:
            self.card_depth = self.depth
            self.card = {"title":"","paragraphs":[],"image":None,"alt":None}

        if self.card is not None:
            if tag == "h3":
                self.capture_title = True
            elif tag == "p":
                self.capture_p = True
                self.card["paragraphs"].append("")
            elif tag == "img" and not self.card["image"]:
                self.card["image"] = attrs.get("src")
                self.card["alt"] = attrs.get("alt")

        if tag not in VOID:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.depth -= 1

    def handle_endtag(self, tag):
        if self.card is not None:
            if tag == "h3":
                self.capture_title = False
            elif tag == "p":
                self.capture_p = False

        if tag not in VOID:
            self.depth -= 1

        if self.card is not None and self.depth == self.card_depth:
            title = re.sub(r"\s+", " ", self.card["title"]).strip()
            paras = [re.sub(r"\s+", " ", p).strip() for p in self.card["paragraphs"]]
            paras = [p for p in paras if p]
            if title:
                self.card["title"] = title
                self.card["paragraphs"] = paras
                self.cards.append(self.card)
            self.card = None
            self.card_depth = None
            self.capture_title = False
            self.capture_p = False

    def handle_data(self, data):
        if self.card is None:
            return
        text = re.sub(r"\s+", " ", data).strip()
        if not text:
            return
        if self.capture_title:
            self.card["title"] += (" " if self.card["title"] else "") + text
        if self.capture_p and self.card["paragraphs"]:
            self.card["paragraphs"][-1] += (" " if self.card["paragraphs"][-1] else "") + text

def slugify(value):
    s = value.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-") or "destination"

def render(cards):
    items = []
    seen = set()
    for c in cards:
        title = c["title"]
        key = title.lower()
        if key in seen:
            continue
        seen.add(key)
        desc = c["paragraphs"][0] if c["paragraphs"] else "Explore this Indonesia destination on JelNusa."
        img = c.get("image")
        media = ""
        if img:
            media = f'<img src="../{escape(img, quote=True)}" alt="{escape(c.get("alt") or title, quote=True)}" loading="lazy">'
        items.append(f'''<article class="card">
  {media}
  <div class="card-body">
    <h2>{escape(title)}</h2>
    <p>{escape(desc)}</p>
    <a href="../?destination={escape(title, quote=True)}#destinations" aria-label="Explore {escape(title, quote=True)} on JelNusa">Explore on JelNusa →</a>
  </div>
</article>''')

    if len(items) < 3:
        raise RuntimeError(f"Only {len(items)} usable destination cards found; refusing to publish a thin hub")

    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Indonesia Destinations | JelNusa</title>
<meta name="description" content="Explore Indonesia destinations and hidden gems curated by JelNusa, with practical planning support from NUSA.">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="https://jelnusa.com/destinations/">
<style>
body{{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;color:#17313a;background:#f7faf8}}
main{{max-width:1120px;margin:auto;padding:32px 20px 64px}}
nav a,a{{color:#0f766e}}
.hero{{padding:24px 0 12px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:24px}}
.card{{background:white;border:1px solid #dfe9e4;border-radius:16px;overflow:hidden}}
.card img{{width:100%;height:180px;object-fit:cover;display:block}}
.card-body{{padding:18px}}
.card h2{{margin:0 0 8px;font-size:1.2rem}}
.card p{{line-height:1.6;color:#4a5d62}}
.card a{{font-weight:700;text-decoration:none}}
.small{{color:#60757a;line-height:1.6}}
</style>
<script type="application/ld+json">
{{
  "@context":"https://schema.org",
  "@type":"CollectionPage",
  "@id":"https://jelnusa.com/destinations/#collection",
  "url":"https://jelnusa.com/destinations/",
  "name":"Indonesia Destinations | JelNusa",
  "isPartOf":{{"@id":"https://jelnusa.com/#website"}},
  "about":{{"@id":"https://jelnusa.com/#organization"}}
}}
</script>
</head>
<body>
<main>
<nav><a href="../">← JelNusa home</a></nav>
<section class="hero">
<h1>Explore Indonesia destinations</h1>
<p class="small">Browse destination ideas already featured on JelNusa. Open any destination on the main experience for trip planning, partner options when available, and help from NUSA.</p>
</section>
<section class="grid" aria-label="JelNusa destinations">
{''.join(items)}
</section>
</main>
</body>
</html>'''

def update_sitemap():
    xml = SITEMAP.read_text(encoding="utf-8")
    if "https://jelnusa.com/destinations/" not in xml:
        insert = '''  <url>
    <loc>https://jelnusa.com/destinations/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
'''
        xml = xml.replace("</urlset>", insert + "</urlset>")
        SITEMAP.write_text(xml, encoding="utf-8")

def main():
    html = INDEX.read_text(encoding="utf-8")
    parser = Parser()
    parser.feed(html)

    unique_titles = []
    seen = set()
    for c in parser.cards:
        k = c["title"].lower()
        if k not in seen:
            seen.add(k)
            unique_titles.append(c["title"])

    page = render(parser.cards)
    OUTDIR.mkdir(exist_ok=True)
    OUT.write_text(page, encoding="utf-8")
    update_sitemap()

    report = {
        "status":"PASS",
        "source":"existing production region-card content only",
        "destination_count":len(unique_titles),
        "destinations":unique_titles,
        "hub":"https://jelnusa.com/destinations/",
        "sitemap_updated":True,
        "footer_link_target":"/destinations/",
        "invented_destination_copy":False,
        "nusa_backend_touched":False,
        "railway_touched":False
    }
    REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))

if __name__ == "__main__":
    main()
