'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildPrompt, normalizeContentType } = require('../src/prompts');

test('normalizeContentType accepts shorthand', () => {
  assert.equal(normalizeContentType('post'), 'social_post');
  assert.equal(normalizeContentType('promo'), 'promotional_offer');
  assert.equal(normalizeContentType('script'), 'video_script');
});

test('buildPrompt includes medical safety rule and exact markers', () => {
  const prompt = buildPrompt('post', 'Neck Pain Relief', 'zh');
  assert.match(prompt, /Avoid guaranteed cure/);
  assert.match(prompt, /---COPY---/);
  assert.match(prompt, /---IMAGE_PROMPT---/);
  assert.match(prompt, /---END---/);
  assert.match(prompt, /Zhengji Wellness/);
});

test('buildPrompt rejects unknown type', () => {
  assert.throws(() => buildPrompt('bad_type', 'Topic', 'zh'), /Unknown contentType/);
});
