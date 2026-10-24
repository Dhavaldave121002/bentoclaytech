const sharp = require('sharp');

// Load user uploaded reference image
sharp('C:/Users/Dhaval/.gemini/antigravity-ide/brain/25c49541-8408-4dce-a29b-87062ca0a0bd/.user_uploaded/media_1792871835332.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(async ({ data, info }) => {
    const { width, height, channels } = info;
    const rgba = Buffer.alloc(width * height * 4);

    // The gold fold bounding box in user screenshot:
    // Left curl starts ~ x = 36, right ends ~ x = 192
    // Top curl starts ~ y = 10, bottom ends ~ y = 166
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcI = (y * width + x) * channels;
        const dstI = (y * width + x) * 4;

        const r = data[srcI];
        const g = data[srcI + 1];
        const b = data[srcI + 2];

        // Is it the outside cream/white background?
        const isWhiteMargin = (r >= 248 && g >= 248 && b >= 248);
        const isCreamCard = (r > 240 && g > 236 && b > 226 && (r - b) < 17);
        const isOutsideContour = (x < 44 && y < 155) || (y < 20 && x < 70) || (x < 36);

        if (isWhiteMargin || isCreamCard || isOutsideContour) {
          rgba[dstI] = 0;
          rgba[dstI + 1] = 0;
          rgba[dstI + 2] = 0;
          rgba[dstI + 3] = 0;
        } else if (r > 230 && g > 224 && b > 214 && (r - b) < 22) {
          // Feathered shadow along curl edge
          const alpha = Math.min(255, Math.max(0, (255 - r) * 14));
          rgba[dstI] = r;
          rgba[dstI + 1] = g;
          rgba[dstI + 2] = b;
          rgba[dstI + 3] = alpha;
        } else {
          rgba[dstI] = r;
          rgba[dstI + 1] = g;
          rgba[dstI + 2] = b;
          rgba[dstI + 3] = 255;
        }
      }
    }

    // Measure exact bounding box of the gold fold content
    let minX = width, maxX = 0, minY = height, maxY = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const a = rgba[(y * width + x) * 4 + 3];
        if (a > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log('Bounding Box before crop:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });

    // Now extract tightly cropped image so bottom-right corner touches (maxX, maxY) exactly!
    const croppedW = maxX - minX + 1;
    const croppedH = maxY - minY + 1;
    const croppedBuf = Buffer.alloc(croppedW * croppedH * 4);

    for (let cy = 0; cy < croppedH; cy++) {
      for (let cx = 0; cx < croppedW; cx++) {
        const srcX = minX + cx;
        const srcY = minY + cy;
        const srcI = (srcY * width + srcX) * 4;
        const dstI = (cy * croppedW + cx) * 4;

        croppedBuf[dstI] = rgba[srcI];
        croppedBuf[dstI + 1] = rgba[srcI + 1];
        croppedBuf[dstI + 2] = rgba[srcI + 2];
        croppedBuf[dstI + 3] = rgba[srcI + 3];
      }
    }

    await sharp(croppedBuf, { raw: { width: croppedW, height: croppedH, channels: 4 } })
      .png()
      .toFile('public/assets/gold-corner-curl.png');

    console.log(`Saved tightly cropped public/assets/gold-corner-curl.png (${croppedW} x ${croppedH}) with 0 margin on bottom-right!`);
  });
