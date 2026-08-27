#!/usr/bin/env python3
"""Punch near-white pixels in logo.png to transparent alpha (keeps mark colors)."""
from pathlib import Path

from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "logo.png"
THRESH = 245
FRINGE = 235


def punch_alpha(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    near_white = (r >= THRESH) & (g >= THRESH) & (b >= THRESH)
    arr[near_white, 3] = 0

    fringe = (~near_white) & (r >= FRINGE) & (g >= FRINGE) & (b >= FRINGE)
    ys, xs = np.where(fringe)
    for y, x in zip(ys, xs):
        m = min(int(r[y, x]), int(g[y, x]), int(b[y, x]))
        arr[y, x, 3] = int(255 * (THRESH - m) / (THRESH - FRINGE))

    return Image.fromarray(arr)


def main() -> None:
    if not LOGO.exists():
        raise SystemExit(f"Missing {LOGO}")
    with Image.open(LOGO) as img:
        punch_alpha(img).save(LOGO)
    print(f"Punched near-white alpha in {LOGO}")


if __name__ == "__main__":
    main()
