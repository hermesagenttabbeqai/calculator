/**
 * Pure arithmetic engine — recursive-descent parser.
 * Supports: + - * /
 * No eval(), no Function().
 */

/**
 * Round a number to at most 10 significant digits to eliminate
 * floating-point noise (e.g. 0.1 + 0.2 === 0.30000000000000004).
 */
function round10sig(n) {
  if (!isFinite(n)) return n;
  return parseFloat(n.toPrecision(10));
}

/**
 * Tokenise the expression into an array of numbers and operator strings.
 * Returns null on any tokenisation error.
 */
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === ' ') { i++; continue; }
    if ('+-*/'.includes(ch)) {
      tokens.push(ch);
      i++;
    } else if ((ch >= '0' && ch <= '9') || ch === '.') {
      let num = '';
      while (i < expr.length && ((expr[i] >= '0' && expr[i] <= '9') || expr[i] === '.')) {
        num += expr[i++];
      }
      const val = Number(num);
      if (isNaN(val)) return null;
      tokens.push(val);
    } else {
      return null; // unexpected character
    }
  }
  return tokens;
}

/**
 * Validate token stream:
 * - must not be empty
 * - must start and end with a number
 * - must alternate number / operator / number …
 */
function validate(tokens) {
  if (tokens.length === 0) return false;
  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      if (typeof tokens[i] !== 'number') return false;
    } else {
      if (typeof tokens[i] !== 'string') return false;
    }
  }
  // length must be odd (numbers on even indices, operators on odd)
  if (tokens.length % 2 === 0) return false;
  return true;
}

/**
 * Evaluate a validated token list respecting operator precedence
 * (* / before + -).
 */
function evalTokens(tokens) {
  // First pass: handle * and /
  let toks = [...tokens];
  let i = 1;
  while (i < toks.length) {
    if (toks[i] === '*' || toks[i] === '/') {
      const left = toks[i - 1];
      const op = toks[i];
      const right = toks[i + 1];
      if (op === '/' && right === 0) {
        return { error: 'Cannot divide by 0' };
      }
      const result = op === '*' ? left * right : left / right;
      toks.splice(i - 1, 3, result);
      // don't advance i — recheck from same position
    } else {
      i += 2;
    }
  }

  // Second pass: handle + and -
  let acc = toks[0];
  for (let j = 1; j < toks.length; j += 2) {
    const op = toks[j];
    const right = toks[j + 1];
    if (op === '+') acc += right;
    else if (op === '-') acc -= right;
  }
  return acc;
}

/**
 * Evaluate an arithmetic expression string.
 * Returns a number or { error: "..." }.
 */
export function evaluate(expr) {
  if (typeof expr !== 'string' || expr.trim() === '') {
    return { error: 'Invalid input' };
  }

  const tokens = tokenize(expr.trim());
  if (tokens === null || !validate(tokens)) {
    return { error: 'Invalid input' };
  }

  const result = evalTokens(tokens);
  if (result !== null && typeof result === 'object' && 'error' in result) {
    return result;
  }

  return round10sig(result);
}
