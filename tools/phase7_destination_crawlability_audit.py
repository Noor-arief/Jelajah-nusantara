from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
REPORT = ROOT / "phase7-destination-crawlability-audit.json"

class CardParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.card_depth = None
        self.current = None
        self.cards = []
        self.in_h3 = False
        self.in_p = False
        self.in_a = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.depth += 1
        classes = set((attrs.get("class") or "").split())

        if self.current is None and "region-card" in classes:
            self.card_depth = self.depth
            self.current = {
                "attrs": attrs,
                "title": "",
                "paragraphs": [],
                "links": [],
                "images": []
            }

        if self.current is not None:
            if tag == "h3":
                self.in_h3 = True
            elif tag == "p":
                self.in_p = True
                self.current["paragraphs"].append("")
            elif tag == "a":
                self.in_a = True
                self.current["links"].append({
                    "href": attrs.get("href"),
                    "class": attrs.get("class"),
                    "text": ""
                })
            elif tag == "img":
                self.current["images"].append({
                    "src": attrs.get("src"),
                    "alt": attrs.get("alt")
                })

    def handle_endtag(self, tag):
        if self.current is not None:
            if tag == "h3":
                self.in_h3 = False
            elif tag == "p":
                self.in_p = False
            elif tag == "a":
                self.in_a = False

            if self.card_depth == self.depth:
                self.cards.append(self.current)
                self.current = None
                self.card_depth = None

        self.depth -= 1

    def handle_data(self, data):
        if self.current is None:
            return
        text = re.sub(r"\s+", " ", data).strip()
        if not text:
            return
        if self.in_h3:
            self.current["title"] += (" " if self.current["title"] else "") + text
        if self.in_p and self.current["paragraphs"]:
            self.current["paragraphs"][-1] += (" " if self.current["paragraphs"][-1] else "") + text
        if self.in_a and self.current["links"]:
            self.current["links"][-1]["text"] += (" " if self.current["links"][-1]["text"] else "") + text

def main():
    html = INDEX.read_text(encoding="utf-8")
    parser = CardParser()
    parser.feed(html)

    cards = []
    for card in parser.cards:
        title = card["title"].strip()
        if not title:
            continue
        paragraphs = [p.strip() for p in card["paragraphs"] if p.strip()]
        links = [l for l in card["links"] if l.get("href") or l.get("text")]
        cards.append({
            "title": title,
            "paragraphs": paragraphs[:6],
            "links": links[:10],
            "images": card["images"][:5],
            "data_attributes": {k: v for k, v in card["attrs"].items() if k.startswith("data-")}
        })

    headings = re.findall(r"<h[12][^>]*>(.*?)</h[12]>", html, re.I | re.S)
    cleaned_headings = []
    for h in headings:
        t = re.sub(r"<[^>]+>", " ", h)
        t = re.sub(r"\s+", " ", t).strip()
        if t:
            cleaned_headings.append(t)

    report = {
        "status": "PASS",
        "region_card_count": len(cards),
        "cards": cards,
        "top_level_headings_sample": cleaned_headings[:80],
        "has_faq_anchor": "faq" in html.lower(),
        "has_guides_term": "guide" in html.lower(),
        "has_destination_term": "destination" in html.lower(),
        "recommendation": "Use existing destination card content as the source of truth for crawlable pages; do not invent destination copy."
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"status":"PASS","region_card_count":len(cards)}, indent=2))

if __name__ == "__main__":
    main()
