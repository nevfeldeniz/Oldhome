"""Update source files with new SEO image paths."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAPPING = json.loads((ROOT / "public" / "image-mapping.json").read_text(encoding="utf-8"))
HOTEL = "Old Home Boutique Hotel Cyprus"

TARGETS = [
    ROOT / "src" / "data" / "roomGalleries.js",
    ROOT / "src" / "data" / "defaultSite.js",
    ROOT / "public" / "site-data.json",
    ROOT / "src" / "components" / "Hero.jsx",
    ROOT / "src" / "components" / "About.jsx",
    ROOT / "src" / "admin" / "panels" / "GeneralPanel.jsx",
    ROOT / "src" / "admin" / "panels" / "RoomTypesPanel.jsx",
]


def replace_paths(text: str) -> str:
    for old, new in sorted(MAPPING.items(), key=lambda x: len(x[0]), reverse=True):
        text = text.replace(old, new)
    text = text.replace("Old Home Cyprus", HOTEL)
    text = text.replace("Old Home Guest House", HOTEL)
    return text


def update_outdoor_alts(text: str) -> str:
    outdoor_alts = {
        "oldhome-cyprus-hotel-exterior-02.jpg": f"Wide view of the boutique hotel exterior at {HOTEL}",
        "oldhome-cyprus-hotel-exterior-03.jpg": f"Front facade and outdoor terrace at {HOTEL}",
        "oldhome-cyprus-terrace-01.jpg": f"Outdoor terrace with seating at {HOTEL}",
        "oldhome-cyprus-terrace-02.jpg": f"Welcome terrace and curved architecture at {HOTEL}",
        "oldhome-cyprus-hotel-sign.jpg": f"Old Home guest house sign at {HOTEL}",
        "oldhome-cyprus-terrace-03.jpg": f"Shaded terrace lounge at {HOTEL}",
        "oldhome-cyprus-garden-seating-01.jpg": f"Garden seating area with wicker furniture at {HOTEL}",
        "oldhome-cyprus-garden-seating-02.jpg": f"Outdoor lounge corner at {HOTEL}",
    }
    for src, alt in outdoor_alts.items():
        text = re.sub(
            rf"(src: '{re.escape(src)}',\s*\n\s*alt: )'[^']*'",
            rf"\1'{alt}'",
            text,
        )
        text = re.sub(
            rf'("src": "{re.escape(src)}",\s*\n\s*"alt": )"[^"]*"',
            rf'\1"{alt}"',
            text,
        )
    return text


def main() -> None:
    for path in TARGETS:
        if not path.exists():
            print(f"SKIP {path}")
            continue
        original = path.read_text(encoding="utf-8")
        updated = replace_paths(original)
        updated = update_outdoor_alts(updated)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"UPDATED {path.relative_to(ROOT)}")
        else:
            print(f"UNCHANGED {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
