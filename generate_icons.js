import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const sharp = require('C:/Users/camil/.gemini/antigravity/scratch/rebuske-whatsapp-bot/node_modules/sharp');

const srcImage = 'C:/Users/camil/.gemini/antigravity/brain/0efe1562-ff3c-463f-b5ee-5944a14c6d84/.user_uploaded/media_1793674684313_b6aad592.png';
const prodDir = 'C:/Users/camil/.gemini/antigravity/scratch/rebuske-app/rebuske-v4-prod';

async function run() {
  console.log('Generating official icon suite for rebuske...');

  const variants = [
    { name: 'principal-ebano', label: 'Principal Ébano', left: 11, top: 13, width: 224, height: 225 },
    { name: 'campana-lima', label: 'Campaña Lima', left: 251, top: 13, width: 224, height: 225 },
    { name: 'neutra-monocromo', label: 'Neutra Monocromo', left: 490, top: 13, width: 225, height: 225 }
  ];

  for (const v of variants) {
    const varDir = path.join(prodDir, 'assets', 'icons', v.name);
    fs.mkdirSync(varDir, { recursive: true });

    const extractedBuffer = await sharp(srcImage)
      .extract({ left: v.left, top: v.top, width: v.width, height: v.height })
      .toBuffer();

    await sharp(extractedBuffer)
      .resize(1024, 1024, { kernel: 'lanczos3', fit: 'cover' })
      .png({ quality: 100 })
      .toFile(path.join(varDir, 'icon-1024x1024.png'));

    const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512];
    for (const s of sizes) {
      await sharp(extractedBuffer)
        .resize(s, s, { kernel: 'lanczos3' })
        .png()
        .toFile(path.join(varDir, `icon-${s}x${s}.png`));
    }
    console.log(`Saved all sizes for variant: ${v.label} (${v.name})`);
  }

  // The official PRIMARY icon for the app root is PRINCIPAL · ÉBANO
  const primaryCrop = await sharp(srcImage)
    .extract({ left: 11, top: 13, width: 224, height: 225 })
    .toBuffer();

  // Root assets
  await sharp(primaryCrop).resize(1024, 1024, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'rebuske-icon-1024.png'));
  await sharp(primaryCrop).resize(512, 512, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'android-chrome-512x512.png'));
  await sharp(primaryCrop).resize(192, 192, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'android-chrome-192x192.png'));
  await sharp(primaryCrop).resize(192, 192, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'favicon.png'));
  await sharp(primaryCrop).resize(180, 180, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'apple-touch-icon.png'));
  await sharp(primaryCrop).resize(32, 32, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'favicon-32x32.png'));
  await sharp(primaryCrop).resize(16, 16, { kernel: 'lanczos3' }).png().toFile(path.join(prodDir, 'favicon-16x16.png'));

  // Maskable icon with safe zone
  await sharp(primaryCrop)
    .resize(410, 410, { kernel: 'lanczos3' })
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: { r: 12, g: 18, b: 10, alpha: 1 } // #0C120A
    })
    .resize(512, 512)
    .png()
    .toFile(path.join(prodDir, 'android-chrome-maskable-512x512.png'));

  console.log('✅ Official icon suite generated successfully for all platforms!');
}

run().catch(console.error);
