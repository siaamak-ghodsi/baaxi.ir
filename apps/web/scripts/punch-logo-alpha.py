#!/usr/bin/env python3
"""Punch logo plate/background to fully transparent alpha (no semi-transparent fringe)."""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "logo.png"


def is_background_pixel(r: int, g: int, b: int) -> bool:
    mn = min(r, g, b)
    mx = max(r, g, b)
    if mx < 25:
        return True
    if mn >= 220:
        return True
    if mx >= 180 and (mx - mn) <= 15:
        return True
    return False


def punch_alpha(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    h, w = arr.shape[:2]
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

    bg = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_background_pixel(int(r[y, x]), int(g[y, x]), int(b[y, x])) and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if is_background_pixel(int(r[y, x]), int(g[y, x]), int(b[y, x])) and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx]:
                if is_background_pixel(int(r[ny, nx]), int(g[ny, nx]), int(b[ny, nx])):
                    bg[ny, nx] = True
                    q.append((ny, nx))

    arr[bg, 3] = 0

    rv = arr[:, :, 0].astype(float)
    gv = arr[:, :, 1].astype(float)
    bv = arr[:, :, 2].astype(float)
    mx = np.maximum(np.maximum(rv, gv), bv)
    mn = np.minimum(np.minimum(rv, gv), bv)
    sat = np.where(mx == 0, 0.0, (mx - mn) / mx)
    leftover = (arr[:, :, 3] > 0) & (
        ((rv >= 235) & (gv >= 235) & (bv >= 235)) | ((sat < 0.08) & (mx >= 170))
    )
    arr[leftover, 3] = 0

    return Image.fromarray(arr)


def main() -> None:
    if not LOGO.exists():
        raise SystemExit(f"Missing {LOGO}")
    with Image.open(LOGO) as img:
        punch_alpha(img).save(LOGO)
    print(f"Punched background to transparent alpha in {LOGO}")


if __name__ == "__main__":
    main()
