'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { findBestReply, scoreReply } = require('../src/whatsapp-reply-engine');
const { AUTO_REPLIES } = require('../src/whatsapp-kb');

test('findBestReply matches neck pain inquiry', () => {
  const result = findBestReply('我颈椎痛，你们可以做吗？');
  assert.equal(result.matched, true);
  assert.equal(result.id, 'neck_pain');
  assert.match(result.reply, /颈椎/);
});

test('findBestReply matches price inquiry', () => {
  const result = findBestReply('请问有什么服务和价钱？');
  assert.equal(result.matched, true);
  assert.equal(result.id, 'services');
  assert.match(result.reply, /RM 168/);
});

test('findBestReply returns fallback for unknown input', () => {
  const result = findBestReply('abcdefg no matching words');
  assert.equal(result.matched, false);
  assert.equal(result.id, 'fallback');
});

test('scoreReply scores keyword matches', () => {
  const entry = AUTO_REPLIES.find((item) => item.id === 'booking');
  assert.ok(scoreReply('我要预约明天下午', entry) > 0);
});
