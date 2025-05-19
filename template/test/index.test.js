// Import Node.js built-in test module
import test from 'node:test';
import { strict as assert } from 'node:assert';

// Import the module to test
import { hello } from '../src/index.js';

// Test suite for hello() function
test('hello() function', async (t) => {
  // Test 1: Basic functionality
  await t.test('returns greeting with provided name', () => {
    assert.equal(hello('World'), 'Hello, World!');
  });
  
  // Test 2: Empty input
  await t.test('works with empty string', () => {
    assert.equal(hello(''), 'Hello, !');
  });
  
  // Test 3: Numbers
  await t.test('works with numbers', () => {
    assert.equal(hello(123), 'Hello, 123!');
  });
});
