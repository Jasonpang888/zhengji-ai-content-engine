'use strict';
try {
  require('dotenv').config();
} catch (_) {
  // Allow local unit tests to run before npm install.
}

const CONFIG = Object.freeze({
  textModel: process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini',
  imageEditModel: process.env.OPENAI_IMAGE_EDIT_MODEL || 'gpt-image-2',
  imageGenModel: process.env.OPENAI_IMAGE_GEN_MODEL || 'gpt-image-1-mini',
  imageSize: process.env.OPENAI_IMAGE_SIZE || '1024x1024',
  defaultReferenceDir: process.env.DEFAULT_REFERENCE_DIR || 'photos/reference',
  defaultOutputDir: process.env.DEFAULT_OUTPUT_DIR || 'generated'
});

function requireApiKey() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.');
  }
  return process.env.OPENAI_API_KEY;
}

module.exports = { CONFIG, requireApiKey };
