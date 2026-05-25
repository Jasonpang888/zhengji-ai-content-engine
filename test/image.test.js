'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { getReferencePhoto, mimeFromFilename } = require('../src/image');

test('mimeFromFilename detects image MIME types', () => {
  assert.equal(mimeFromFilename('a.jpg'), 'image/jpeg');
  assert.equal(mimeFromFilename('a.jpeg'), 'image/jpeg');
  assert.equal(mimeFromFilename('a.webp'), 'image/webp');
  assert.equal(mimeFromFilename('a.png'), 'image/png');
});

test('getReferencePhoto returns first image in folder', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'zhengji-ref-'));
  const file = path.join(dir, 'doctor.png');
  fs.writeFileSync(file, 'fake');
  assert.equal(getReferencePhoto(dir), file);
});

test('getReferencePhoto returns null for missing folder', () => {
  assert.equal(getReferencePhoto('/definitely/missing/folder'), null);
});
