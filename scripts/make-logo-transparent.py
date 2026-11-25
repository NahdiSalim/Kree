from PIL import Image
import os

src = r"F:\_Salim\SSEdWorks\Kree\public\images\logo\tunisrent.jpg"
dst = r"F:\_Salim\SSEdWorks\Kree\public\images\logo\tunisrent.png"

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        minc = min(r, g, b)
        if r > 235 and g > 235 and b > 235:
            pixels[x, y] = (r, g, b, 0)
        elif r > 220 and g > 220 and b > 220 and abs(r - g) < 12 and abs(g - b) < 12:
            t = (minc - 220) / 35.0
            alpha = int(max(0, min(255, 255 * (1 - t))))
            pixels[x, y] = (r, g, b, alpha)

bbox = im.getbbox()
if bbox:
    pad = 8
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(w, right + pad)
    bottom = min(h, bottom + pad)
    im = im.crop((left, top, right, bottom))

im.save(dst, "PNG", optimize=True)
print("saved", dst, im.size, os.path.getsize(dst))
