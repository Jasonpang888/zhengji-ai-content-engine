'use strict';

const fs = require('fs');
const path = require('path');
const { CONFIG, requireApiKey } = require('./config');

function getReferencePhoto(referenceDir = CONFIG.defaultReferenceDir) {
  const absDir = path.isAbsolute(referenceDir)
    ? referenceDir
    : path.join(process.cwd(), referenceDir);

  if (!fs.existsSync(absDir)) return null;

  const files = fs
    .readdirSync(absDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  if (files.length === 0) return null;
  return path.join(absDir, files[0]);
}

function mimeFromFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return 'image/png';
}

async function getOpenAI() {
  requireApiKey();
  const { OpenAI, toFile } = require('openai');
  return { openai: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), toFile };
}

async function generateImage(imagePrompt, options = {}) {
  if (!imagePrompt || !imagePrompt.trim()) {
    throw new Error('Image prompt is empty.');
  }

  const outputDir = options.outputDir || CONFIG.defaultOutputDir;
  const referenceDir = options.referenceDir || CONFIG.defaultReferenceDir;
  const refImageBuffer = options.refImageBuffer || null;
  const refImageMime = options.refImageMime || 'image/jpeg';

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filepath = path.join(outputDir, 'zhengji_' + Date.now() + '.png');
  const { openai, toFile } = await getOpenAI();

  let imageFile = null;

  if (refImageBuffer) {
    console.log('[image] Using uploaded reference photo...');
    imageFile = await toFile(refImageBuffer, 'reference.jpg', { type: refImageMime });
  } else {
    const refPhoto = getReferencePhoto(referenceDir);
    if (refPhoto) {
      console.log('[image] Reference photo found:', refPhoto);
      imageFile = await toFile(fs.createReadStream(refPhoto), path.basename(refPhoto), {
        type: mimeFromFilename(refPhoto)
      });
    }
  }

  if (imageFile) {
    const editPrompt = [
      `Place the person from the reference image into this scene: ${imagePrompt}.`,
      'Keep the person\'s face and appearance identical to the reference.',
      'Photorealistic. No animation, no illustration, no cartoon.'
    ].join(' ');

    const resp = await openai.images.edit({
      model: CONFIG.imageEditModel,
      image: imageFile,
      prompt: editPrompt,
      n: 1,
      size: CONFIG.imageSize
    });

    const b64 = resp.data?.[0]?.b64_json;
    if (!b64) throw new Error('No image data returned from image edit.');
    fs.writeFileSync(filepath, Buffer.from(b64, 'base64'));
    console.log('[image] Saved with reference:', filepath);
    return filepath;
  }

  console.log('[image] No reference photo. Generating text-to-image...');
  const resp = await openai.images.generate({
    model: CONFIG.imageGenModel,
    prompt: imagePrompt,
    n: 1,
    size: CONFIG.imageSize
  });

  const b64 = resp.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image data returned from image generation.');
  fs.writeFileSync(filepath, Buffer.from(b64, 'base64'));
  console.log('[image] Saved:', filepath);
  return filepath;
}

module.exports = { getReferencePhoto, mimeFromFilename, generateImage };
