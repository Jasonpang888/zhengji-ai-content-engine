'use strict';

function parseOutput(raw = '') {
  const copyMatch = raw.match(/---COPY---([\s\S]*?)(---IMAGE_PROMPT---|$)/i);
  const imgMatch = raw.match(/---IMAGE_PROMPT---([\s\S]*?)(---END---|$)/i);

  let copy = copyMatch ? copyMatch[1] : raw;
  let imagePrompt = imgMatch ? imgMatch[1] : '';

  copy = copy
    .replace(/---COPY---/gi, '')
    .replace(/---IMAGE_PROMPT---[\s\S]*$/gi, '')
    .replace(/---END---/gi, '')
    .trim();

  imagePrompt = imagePrompt
    .replace(/---END---/gi, '')
    .trim();

  return { copy, imagePrompt };
}

module.exports = { parseOutput };
