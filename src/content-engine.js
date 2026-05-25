'use strict';

const path = require('path');
const { CONFIG, requireApiKey } = require('./config');
const { buildPrompt, normalizeContentType, CLINIC_CONTEXT } = require('./prompts');
const { parseOutput } = require('./parser');
const { generateImage } = require('./image');

async function getOpenAIClient() {
  requireApiKey();
  const { OpenAI } = require('openai');
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

async function generateContent({ contentType, topic, language = 'zh' }) {
  const normalizedType = normalizeContentType(contentType);
  const openai = await getOpenAIClient();

  const resp = await openai.chat.completions.create({
    model: CONFIG.textModel,
    messages: [
      {
        role: 'user',
        content: buildPrompt(normalizedType, topic, language)
      }
    ],
    temperature: 0.85,
    max_tokens: 1200
  });

  const raw = resp.choices?.[0]?.message?.content || '';
  return parseOutput(raw);
}

async function runPipeline({
  contentType,
  topic,
  language = 'zh',
  publish = false,
  generateImg = true,
  referenceDir = CONFIG.defaultReferenceDir,
  outputDir = CONFIG.defaultOutputDir
}) {
  console.log('\n[pipeline] ' + contentType + ' | ' + topic + ' | lang: ' + language);

  const { copy, imagePrompt } = await generateContent({ contentType, topic, language });

  console.log('\n--- COPY ---\n' + copy);
  console.log('\n--- IMAGE PROMPT ---\n' + imagePrompt);

  let imagePath = null;
  if (generateImg && imagePrompt) {
    try {
      imagePath = await generateImage(imagePrompt, { referenceDir, outputDir });
    } catch (err) {
      console.error('[image] Error:', err.message);
    }
  }

  if (publish) {
    const { publishToFacebook } = require('./publishers/facebook');
    await publishToFacebook({ copy, imagePath });
  }

  return { copy, imagePrompt, imagePath };
}

async function createContentPackage({ contentType, topic, generateImg = true }) {
  const languages = ['zh', 'en', 'ms'];
  const results = {};

  for (const lang of languages) {
    try {
      const { copy, imagePrompt } = await generateContent({
        contentType,
        topic,
        language: lang
      });
      results[lang] = { copy, imagePrompt };
    } catch (err) {
      console.error(`[content] ${lang} failed:`, err.message);
      results[lang] = { copy: '', imagePrompt: '' };
    }
  }

  let imagePath = null;
  let imageUrl = null;

  if (generateImg) {
    const prompt = results.zh?.imagePrompt || results.en?.imagePrompt || results.ms?.imagePrompt || '';
    if (prompt) {
      try {
        imagePath = await generateImage(prompt);
        imageUrl = '/generated/' + path.basename(imagePath);
      } catch (err) {
        console.error('[content-engine] Image generation failed:', err.message);
      }
    }
  }

  return { ...results, imagePath, imageUrl };
}

module.exports = {
  generateContent,
  generateImage,
  runPipeline,
  createContentPackage,
  parseOutput,
  buildPrompt,
  CLINIC_CONTEXT
};

if (require.main === module) {
  const noImage = process.argv.includes('--no-image');
  runPipeline({
    contentType: 'post',
    topic: 'Neck Pain Relief',
    language: 'zh',
    publish: false,
    generateImg: !noImage
  }).catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}
