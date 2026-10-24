const sharp = require('sharp');

sharp('C:/Users/Dhaval/.gemini/antigravity-ide/brain/25c49541-8408-4dce-a29b-87062ca0a0bd/.user_uploaded/media_1792871835332.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(async ({ data, info }) => {
    const { width, height, channels } = info;
    const finalRgba = Buffer.alloc(width * height * 4);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const srcI = (y * width + x) * channels;
        const dstI = (y * width + x) * 4;

        const r = data[srcI];
        const g = data[srcI + 1];
        const b = data[srcI + 2];

        // Background card is light cream: r > 240, g > 236, b > 226
        const isBackgroundPaper = (r > 241 && g > 237 && b > 227);
        const goldTint = (r - b);

        // Outside area: left of curl and above curl
        const isOutsideCurl = (x < 44 && y < 155) || (y < 22 && x < 70) || (x < 36);

        if (isOutsideCurl || (isBackgroundPaper && goldTint < 17)) {
          finalRgba[dstI] = 0;
          finalRgba[dstI + 1] = 0;
          finalRgba[dstI + 2] = 0;
          finalRgba[dstI + 3] = 0;
        } else if (r > 230 && g > 224 && b > 214 && goldTint < 22) {
          // Soft edge blending
          const alpha = Math.min(255, Math.max(0, (255 - r) * 14));
          finalRgba[dstI] = r;
          finalRgba[dstI + 1] = g;
          finalRgba[dstI + 2] = b;
          finalRgba[dstI + 3] = alpha;
        } else {
          finalRgba[dstI] = r;
          finalRgba[dstI + 1] = g;
          finalRgba[dstI + 2] = b;
          finalRgba[dstI + 3] = 255;
        }
      }
    }

    await sharp(finalRgba, { raw: { width, height, channels: 4 } })
      .png()
      .toFile('public/assets/gold-corner-curl.png');

    console.log('Pristine gold-corner-curl.png generated');
  });
