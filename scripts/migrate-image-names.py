"""Rename all public images to SEO-friendly oldhome-cyprus-* names."""
from __future__ import annotations

import json
import os
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

OUTDOOR_MAP = {
    "outdoor/hero.jpg": "oldhome-cyprus-hotel-exterior.jpg",
    "outdoor/01.png": "oldhome-cyprus-hotel-exterior-02.jpg",
    "outdoor/02.png": "oldhome-cyprus-hotel-exterior-03.jpg",
    "outdoor/03.png": "oldhome-cyprus-terrace-01.jpg",
    "outdoor/04.png": "oldhome-cyprus-terrace-02.jpg",
    "outdoor/05.png": "oldhome-cyprus-hotel-sign.jpg",
    "outdoor/06.png": "oldhome-cyprus-terrace-03.jpg",
    "outdoor/07.png": "oldhome-cyprus-garden-seating-01.jpg",
    "outdoor/08.png": "oldhome-cyprus-garden-seating-02.jpg",
}

ROOM_FILES = {
    "001": [
        ("01.png", "overview"),
        ("02.png", "bed"),
        ("03.png", "angle"),
        ("04.png", "view"),
        ("14.png", "sink"),
        ("15.png", "shower"),
        ("17.png", "detail"),
        ("19.png", "detail"),
    ],
    "002": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "003": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "005": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "006": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "008": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "009": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
    "011": [(f"{i:02d}.png", c) for i, c in enumerate(
        ["overview", "bed", "angle", "view", "sink", "shower", "detail", "detail"], 1
    )],
}


def seo_name(room_id: str, category: str, counters: dict[str, int]) -> str:
    if category in ("overview", "bed", "angle", "view"):
        key = "room"
        counters[key] = counters.get(key, 0) + 1
        return f"oldhome-cyprus-room-{room_id}-{counters[key]:02d}.jpg"
    if category in ("sink", "shower"):
        key = "bathroom"
        counters[key] = counters.get(key, 0) + 1
        return f"oldhome-cyprus-room-bathroom-{room_id}-{counters[key]:02d}.jpg"
    key = "interior"
    counters[key] = counters.get(key, 0) + 1
    return f"oldhome-cyprus-room-interior-{room_id}-{counters[key]:02d}.jpg"


def save_jpg(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=88, optimize=True)


def build_mapping() -> dict[str, str]:
    mapping: dict[str, str] = {}
    mapping.update(OUTDOOR_MAP)

    for room_id, files in ROOM_FILES.items():
        counters: dict[str, int] = {}
        for filename, category in files:
            old_rel = f"rooms/{room_id}/{filename}"
            mapping[old_rel] = seo_name(room_id, category, counters)

    mapping.update({
        "room-1.png": "oldhome-cyprus-room-003-01.jpg",
        "room-2.png": "oldhome-cyprus-room-001-01.jpg",
        "room-3.png": "oldhome-cyprus-room-002-01.jpg",
        "room.png": "oldhome-cyprus-room-001-02.jpg",
        "bathroom.png": "oldhome-cyprus-room-bathroom-001-01.jpg",
        "hero-building.png": "oldhome-cyprus-hotel-exterior-02.jpg",
    })
    return mapping


def main() -> None:
    for old_jpg in PUBLIC.glob("oldhome-cyprus-*.jpg"):
        old_jpg.unlink()

    mapping = build_mapping()

    for old_rel, new_name in mapping.items():
        src = PUBLIC / old_rel.replace("/", os.sep)
        dest = PUBLIC / new_name
        if src.exists():
            save_jpg(src, dest)
            print(f"OK {old_rel} -> {new_name}")
        else:
            print(f"MISSING {old_rel}")

    (PUBLIC / "image-mapping.json").write_text(json.dumps(mapping, indent=2), encoding="utf-8")
    print(f"\nMapped {len(mapping)} unique files -> {len(set(mapping.values()))} outputs")


if __name__ == "__main__":
    main()
