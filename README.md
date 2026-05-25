# Zhengji AI Content Engine

AI content engine for **Zhengji Wellness**, designed to generate trilingual social media copy and matching AI image prompts for clinic marketing.

## What it does

- Generates copy in Chinese, English, and Bahasa Melayu
- Supports three content types: `promo`, `post`, and `script`
- Produces a matching English `IMAGE_PROMPT`
- Generates AI images with OpenAI Image API
- Uses therapist reference photo when available
- Falls back to text-to-image when no reference photo exists
- Includes safer clinic wording to avoid overclaiming medical results

## Setup

```bash
npm install
cp .env.example .env
```

Then edit `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_TEXT_MODEL=gpt-4.1-mini
OPENAI_IMAGE_EDIT_MODEL=gpt-image-2
OPENAI_IMAGE_GEN_MODEL=gpt-image-1-mini
OPENAI_IMAGE_SIZE=1024x1024
```

## Add therapist reference photo

Place one reference image here:

```text
photos/reference/
```

Supported formats:

```text
.jpg .jpeg .png .webp
```

If a reference photo exists, the engine will try to keep the therapist's real face and appearance in the generated image.

## Run demo

Generate content only:

```bash
npm run demo:copy
```

Generate content and image:

```bash
npm start
```

## Use in server.js

```js
const { createContentPackage } = require('./src/content-engine');

const result = await createContentPackage({
  contentType: 'post',
  topic: 'Neck Pain Relief',
  generateImg: true
});

console.log(result.zh.copy);
console.log(result.en.copy);
console.log(result.ms.copy);
console.log(result.imageUrl);
```

## Test

```bash
npm test
```

The tests check prompt generation, marker parsing, and reference-photo detection without calling the OpenAI API.

## Suggested next step

Connect this module to a dashboard endpoint:

```text
POST /generate
body: { contentType, topic, generateImg }
```

Then return:

```js
{
  zh: { copy },
  en: { copy },
  ms: { copy },
  imagePath,
  imageUrl
}
```