import test from 'node:test';
import assert from 'node:assert/strict';

import {githubUrlToRawUrl, parseLineAnchor} from './sourceUrl.ts';

test('githubUrlToRawUrl converts a GitHub tree URL to a raw content URL', () => {
  assert.equal(
    githubUrlToRawUrl(
      'https://github.com/wzf1997/claude-code-source/tree/master/source/src/foo.ts',
    ),
    'https://raw.githubusercontent.com/wzf1997/claude-code-source/master/source/src/foo.ts',
  );
});

test('githubUrlToRawUrl strips the line anchor when converting the URL', () => {
  assert.equal(
    githubUrlToRawUrl(
      'https://github.com/wzf1997/claude-code-source/tree/master/source/src/foo.ts#L12-L16',
    ),
    'https://raw.githubusercontent.com/wzf1997/claude-code-source/master/source/src/foo.ts',
  );
});

test('parseLineAnchor returns the start and end line from a GitHub anchor', () => {
  assert.deepEqual(parseLineAnchor('#L12-L16'), {start: 12, end: 16});
});

test('parseLineAnchor returns null when the anchor is missing', () => {
  assert.equal(parseLineAnchor(''), null);
});
