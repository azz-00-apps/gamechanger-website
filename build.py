#!/usr/bin/env python3
"""Assembles final static pages from partials/ + content/ + pages.json.
Guarantees every page shares byte-identical header/footer. Run after editing
any content/<slug>.html fragment or the partials themselves.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).parent
PAGES = json.loads((ROOT / "pages.json").read_text())
HEADER = (ROOT / "partials" / "header.html").read_text()
FOOTER = (ROOT / "partials" / "footer.html").read_text()

# Cache-busting version tag for shared assets, based on content hash so it
# only changes when the files actually change (not on every build).
import hashlib
_asset_bytes = (
    (ROOT / "css" / "tokens.css").read_bytes()
    + (ROOT / "css" / "base.css").read_bytes()
    + (ROOT / "js" / "main.js").read_bytes()
)
ASSET_VERSION = hashlib.sha1(_asset_bytes).hexdigest()[:10]

SHELL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="css/tokens.css?v={asset_version}">
<link rel="stylesheet" href="css/base.css?v={asset_version}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.css">
{page_css}
</head>
<body>
{header}
<main id="main">
{content}
</main>
{footer}
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js" defer></script>
<script src="js/main.js?v={asset_version}" defer></script>
</body>
</html>
"""

missing = []
for page in PAGES:
    content_path = ROOT / "content" / f"{page['slug']}.html"
    if not content_path.exists():
        missing.append(page["slug"])
        continue
    content = content_path.read_text()

    page_css_path = ROOT / "css" / "pages" / f"{page['slug']}.css"
    page_css = (
        f'<link rel="stylesheet" href="css/pages/{page["slug"]}.css">'
        if page_css_path.exists()
        else ""
    )

    header = HEADER
    if page["nav_href"]:
        needle = f'href="{page["nav_href"]}">'
        replacement = f'href="{page["nav_href"]}" aria-current="page">'
        # Only replace the first occurrence in the top-level nav links, not the
        # identical href that may also appear inside the dropdown submenu.
        header = header.replace(needle, replacement, 1)

    html = SHELL.format(
        title=page["title"],
        description=page["description"],
        header=header,
        content=content,
        footer=FOOTER,
        page_css=page_css,
        asset_version=ASSET_VERSION,
    )
    (ROOT / page["file"]).write_text(html)
    print(f"built {page['file']}")

if missing:
    print("\nMISSING content fragments (not built):", ", ".join(missing))
else:
    print("\nAll pages built.")
