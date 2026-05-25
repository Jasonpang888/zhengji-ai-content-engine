'use strict';

const { AUTO_REPLIES } = require('./whatsapp-kb');

function normaliseText(text = '') {
  return String(text).toLowerCase().trim();
}

function scoreReply(message, entry) {
  const text = normaliseText(message);
  if (!text) return 0;

  return entry.keywords.reduce((score, keyword) => {
    const key = normaliseText(keyword);
    if (!key) return score;
    return text.includes(key) ? score + key.length : score;
  }, 0);
}

function findBestReply(message, options = {}) {
  const language = options.language || null;
  const candidates = language
    ? AUTO_REPLIES.filter((entry) => entry.language === language)
    : AUTO_REPLIES;

  let best = null;
  let bestScore = 0;

  for (const entry of candidates) {
    const score = scoreReply(message, entry);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (!best) {
    return {
      matched: false,
      id: 'fallback',
      category: 'fallback',
      language: language || 'zh',
      reply: '您好，感谢您的信息。请问您目前主要想了解：服务项目、价钱、地址、营业时间，还是想预约呢？😊'
    };
  }

  return { matched: true, score: bestScore, ...best };
}

module.exports = { normaliseText, scoreReply, findBestReply };

if (require.main === module) {
  const input = process.argv.slice(2).join(' ') || '我颈椎痛可以做吗';
  const result = findBestReply(input);
  console.log(result.reply);
}
