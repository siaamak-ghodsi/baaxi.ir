#!/usr/bin/env python3
"""Resize apps/web/public/logo.png to favicon.png (same source asset, no redraw)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "logo.png"
FAVICON = ROOT / "public" / "favicon.png"

def main() -> None:
    if not LOGO.exists():
        raise SystemExit(f"Missing {LOGO}")
    with Image.open(LOGO) as img:
        img.convert("RGBA").resize((64, 64), Image.Resampling.LANCZOS).save(FAVICON)

if __name__ == "__main__":
    main()
