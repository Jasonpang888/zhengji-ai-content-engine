'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseOutput } = require('../src/parser');

test('parseOutput extracts copy and image prompt with all markers', () => {
  const raw = `---COPY---\nHello Zhengji\n---IMAGE_PROMPT---\nA photorealistic clinic scene.\n---END---`;
  const result = parseOutput(raw);
  assert.equal(result.copy, 'Hello Zhengji');
  assert.equal(result.imagePrompt, 'A photorealistic clinic scene.');
});

test('parseOutput handles missing END marker', () => {
  const raw = `---COPY---\nCopy text\n---IMAGE_PROMPT---\nImage text`;
  const result = parseOutput(raw);
  assert.equal(result.copy, 'Copy text');
  assert.equal(result.imagePrompt, 'Image text');
});

test('parseOutput removes residual markers from copy', () => {
  const raw = `---COPY---\nGood copy\n---END---\n---IMAGE_PROMPT---\nPrompt\n---END---`;
  const result = parseOutput(raw);
  assert.equal(result.copy, 'Good copy');
  assert.equal(result.imagePrompt, 'Prompt');
});
