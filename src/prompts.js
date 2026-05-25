'use strict';

const CLINIC_CONTEXT = [
  'Clinic: Zhengji Wellness (Spinal Health Centre)',
  'Location: 49 Jalan Dungun, Bukit Damansara, Kuala Lumpur',
  'Hours: Monday-Sunday 11:00am-8:00pm',
  'Phone: +60-17-826 7546',
  'Website: www.zhengjiwellness.com',
  'Specialties: cervical pain, back pain, pelvic misalignment, posture correction, postpartum recovery',
  'Method: Wei-style spinal adjustment - hands-on, gentle approach, personalised assessment, aims to support better mobility and comfort',
  'Contact: WhatsApp to book'
].join('\n');

const CONTENT_TYPES = Object.freeze({
  promo: 'promotional_offer',
  post: 'social_post',
  script: 'video_script'
});

const LANGUAGE_LABELS = Object.freeze({
  zh: 'Chinese (Simplified)',
  en: 'English',
  ms: 'Bahasa Melayu'
});

const TYPE_INSTRUCTIONS = Object.freeze({
  promotional_offer: `Generate a SHORT punchy promo social media post.
Structure: 1) eye-catching headline, 2) problem statement, 3) special offer/CTA, 4) clinic info + WhatsApp, 5) 3-5 hashtags.
Under 150 words. Use emojis. Warm, trustworthy tone.
Avoid guaranteed cure, instant cure, medical diagnosis claims, or replacing doctor consultation. Use safe wording like "may help", "support", "assessment recommended".
IMAGE_PROMPT: Vivid photorealistic scene — the clinic therapist in action treating a patient. Specific action, patient expression, lighting, camera angle. End: "Photorealistic photo. No animation, no illustration, no cartoon, no 3D render."`,

  social_post: `Generate a valuable educational or story-driven social media post.
Structure: 1) relatable hook, 2) educational value or patient story, 3) subtle service mention, 4) CTA, 5) 4-6 hashtags.
Under 200 words. Use emojis. Caring, expert tone.
Avoid guaranteed cure, instant cure, medical diagnosis claims, or replacing doctor consultation. Use safe wording like "may help", "support", "assessment recommended".
IMAGE_PROMPT: Vivid photorealistic scene matching the post content. Describe person, emotion, action, environment, lighting. End: "Photorealistic photo. No animation, no illustration, no cartoon, no 3D render."`,

  video_script: `Generate a TikTok/Reels script (30-45 seconds).
Sections: [HOOK] 3s, [PROBLEM] 5-8s, [SOLUTION] 10-15s, [SOCIAL PROOF] 5-8s, [CTA] 5s.
Under 120 spoken words. Add on-screen text in (parentheses).
Avoid guaranteed cure, instant cure, medical diagnosis claims, or replacing doctor consultation. Use safe wording like "may help", "support", "assessment recommended".
IMAGE_PROMPT: Compelling thumbnail — most visually striking moment. Face, emotion, action, clinic environment. End: "Photorealistic photo. No animation, no illustration, no cartoon, no 3D render."`
});

function normalizeContentType(contentType) {
  const normalized = CONTENT_TYPES[contentType] || contentType;
  if (!TYPE_INSTRUCTIONS[normalized]) {
    throw new Error('Unknown contentType. Use: promo | post | script');
  }
  return normalized;
}

function buildPrompt(contentType, topic, language = 'zh') {
  const normalizedType = normalizeContentType(contentType);
  const langLabel = LANGUAGE_LABELS[language] || LANGUAGE_LABELS.zh;
  const instructions = TYPE_INSTRUCTIONS[normalizedType];

  return `You are a trilingual social media writer for a spinal wellness clinic in KL.
CLINIC INFO: ${CLINIC_CONTEXT}
TASK: ${instructions}
TOPIC: ${topic}
OUTPUT LANGUAGE: ${langLabel}
RULES: Copy in ${langLabel} only. IMAGE_PROMPT in English only — specific vivid scene, no generic instructions.
Format EXACTLY:
---COPY---
[post copy]
---IMAGE_PROMPT---
[scene description]
---END---`;
}

module.exports = {
  CLINIC_CONTEXT,
  CONTENT_TYPES,
  LANGUAGE_LABELS,
  normalizeContentType,
  buildPrompt
};
