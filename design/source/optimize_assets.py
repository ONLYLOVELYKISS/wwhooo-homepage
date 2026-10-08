"""Asset pipeline for wwhooo-homepage.

Regenerates the self-hosted, responsive image derivatives and the brand icons
from the master photograph, so the site no longer depends on the jsDelivr CDN
and no longer ships a 1.75 MB JPEG as its LCP element.

Usage (needs Pillow):

    python design/source/optimize_assets.py

Re-run this after replacing design/source/sakura-original.jpg. The generated
files under public/ are committed; this script is not part of `npm run build`.
"""
import os
from PIL import Image, ImageDraw

MASTER_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(MASTER_DIR))
SRC = os.path.join(MASTER_DIR, "sakura-original.jpg")
OUT_IMAGES = os.path.join(ROOT, "public", "images")
OUT_PUBLIC = os.path.join(ROOT, "public")

os.makedirs(OUT_IMAGES, exist_ok=True)

src = Image.open(SRC).convert("RGB")
print("source:", src.size, "mode", src.mode)

# ---------------------------------------------------------------- photography
def resized(width):
    ratio = width / src.width
    height = max(1, round(src.height * ratio))
    return src.resize((width, height), Image.LANCZOS)

report = []
for width in (800, 1600, 2400):
    img = resized(width)
    webp = os.path.join(OUT_IMAGES, f"sakura-{width}.webp")
    img.save(webp, "WEBP", quality=80, method=6)
    report.append((os.path.basename(webp), img.size, os.path.getsize(webp)))

fallback = resized(1600)
jpg = os.path.join(OUT_IMAGES, "sakura-1600.jpg")
fallback.save(jpg, "JPEG", quality=80, optimize=True, progressive=True)
report.append((os.path.basename(jpg), fallback.size, os.path.getsize(jpg)))

# Small derivative for the library card background (rendered at <= 360 CSS px).
card = resized(700)
card_webp = os.path.join(OUT_IMAGES, "sakura-card.webp")
card.save(card_webp, "WEBP", quality=76, method=6)
report.append((os.path.basename(card_webp), card.size, os.path.getsize(card_webp)))

# The master stays out of the published tree so it is never served to visitors.
report.append(("design/source/sakura-original.jpg (master, unpublished)", src.size, os.path.getsize(SRC)))

# --------------------------------------------------------------------- icons
INK = (20, 28, 27, 255)
PAPER = (225, 233, 228, 255)
ACCENT = (191, 89, 69, 255)

def draw_icon(size):
    """A bold 'W' on the ink square: legible down to 16 px, unlike a ringed monogram."""
    scale = 4
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=round(s * 0.22), fill=INK)
    cx = cy = s / 2
    width = s * 0.62
    step = width / 4
    left = cx - width / 2
    top = cy - s * 0.17
    bottom = cy + s * 0.17
    d.line(
        [
            (left, top),
            (left + step, bottom),
            (left + step * 2, top),
            (left + step * 3, bottom),
            (left + step * 4, top),
        ],
        fill=PAPER,
        width=max(1, round(s * 0.085)),
        joint="curve",
    )
    # the one warm note in the mark
    dot = s * 0.06
    dx, dy = cx + s * 0.33, cy - s * 0.33
    d.ellipse([dx - dot, dy - dot, dx + dot, dy + dot], fill=ACCENT)
    return img.resize((size, size), Image.LANCZOS)

for name, size in (("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)):
    path = os.path.join(OUT_PUBLIC, name)
    draw_icon(size).save(path, "PNG", optimize=True)
    report.append((name, (size, size), os.path.getsize(path)))

for name, dims, nbytes in report:
    print(f"  {name:<34} {dims[0]}x{dims[1]:<6} {nbytes/1024:8.1f} KB")

total = sum(r[2] for r in report if r[0].startswith("sakura-"))
print(f"published sakura derivatives total: {total/1024:.1f} KB (was 1751.1 KB)")
