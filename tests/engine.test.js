import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluate } from '../public/js/engine.js';

describe('evaluate()', () => {
  it('3+4 returns 7', () => {
    assert.strictEqual(evaluate('3+4'), 7);
  });

  it('10/2 returns 5', () => {
    assert.strictEqual(evaluate('10/2'), 5);
  });

  it('6*7 returns 42', () => {
    assert.strictEqual(evaluate('6*7'), 42);
  });

  it('9-5 returns 4', () => {
    assert.strictEqual(evaluate('9-5'), 4);
  });

  it('5/0 returns { error: "Cannot divide by 0" }', () => {
    assert.deepStrictEqual(evaluate('5/0'), { error: 'Cannot divide by 0' });
  });

  it('5++3 returns { error: "Invalid input" }', () => {
    assert.deepStrictEqual(evaluate('5++3'), { error: 'Invalid input' });
  });

  it('"" returns { error: "Invalid input" }', () => {
    assert.deepStrictEqual(evaluate(''), { error: 'Invalid input' });
  });

  it('0.1+0.2 returns 0.3 (rounded to 10 sig digits)', () => {
    assert.strictEqual(evaluate('0.1+0.2'), 0.3);
  });

  it('1000000*1000000 returns 1000000000000', () => {
    assert.strictEqual(evaluate('1000000*1000000'), 1000000000000);
  });
});
