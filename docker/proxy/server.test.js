const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildHeaders, targetFor } = require('./server');
test('preserves HTTPS, original host and client address from Caddy', () => {
  const headers = buildHeaders({}, {headers: {host:'soocloo.com', 'x-forwarded-proto':'https', 'x-forwarded-for':'203.0.113.7'}, socket:{remoteAddress:'172.18.0.2'}});
  assert.equal(headers.host, 'soocloo.com');
  assert.equal(headers['x-forwarded-proto'], 'https');
  assert.equal(headers['x-forwarded-for'], '203.0.113.7');
  assert.equal(headers['x-forwarded-host'], 'soocloo.com');
});
test('routes API and WebSocket paths without capturing unrelated frontend routes', () => {
  for (const url of ['/api/v1/students', '/ws', '/ws/info?t=1']) assert.equal(targetFor({url}).host,'backend');
  for (const url of ['/', '/students', '/apiary', '/wschool']) assert.equal(targetFor({url}).host,'frontend');
});
