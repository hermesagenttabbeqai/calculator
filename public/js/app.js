/**
 * app.js — UI behaviour and wiring
 * Covers: BR-01, BR-03, BR-04, BR-05, BR-06, BR-09, BR-10, BR-11, BR-12, NFR-06
 */

import { evaluate } from './engine.js';

const HISTORY_KEY = 'calc-history';
const HISTORY_MAX = 5;

// Operator display → internal mapping
const OPERATOR_MAP = {
  '÷': '/',
  '×': '*',
  '−': '-',
  '+': '+',
};

let expression = '';
let lastResult = '0';

// DOM refs (assigned on DOMContentLoaded)
let exprEl, resultEl, historyListEl, historyEmptyEl, copyBtn;

// ── State helpers ──────────────────────────────────────────────────────────

function setExpression(val) {
  expression = val;
  exprEl.textContent = val;
}

function setResult(val) {
  lastResult = String(val);
  resultEl.textContent = lastResult;
}

// ── History ────────────────────────────────────────────────────────────────

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function renderHistory(history) {
  historyListEl.innerHTML = '';
  if (history.length === 0) {
    historyEmptyEl.style.display = '';
    return;
  }
  historyEmptyEl.style.display = 'none';
  for (const entry of history) {
    const li = document.createElement('li');
    li.className = 'history__item';
    li.textContent = `${entry.expr} = ${entry.result}`;
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `Load result ${entry.result}`);
    li.addEventListener('click', () => {
      setExpression(String(entry.result));
      setResult(entry.result);
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setExpression(String(entry.result));
        setResult(entry.result);
      }
    });
    historyListEl.appendChild(li);
  }
}

function addHistoryEntry(expr, result) {
  const history = loadHistory();
  history.unshift({ expr, result });
  if (history.length > HISTORY_MAX) history.length = HISTORY_MAX;
  saveHistory(history);
  renderHistory(history);
}

// ── Actions ────────────────────────────────────────────────────────────────

function appendDigit(val) {
  setExpression(expression + val);
}

function appendOperator(displayVal) {
  const internal = OPERATOR_MAP[displayVal] ?? displayVal;
  setExpression(expression + internal);
}

function doEquals() {
  if (expression.trim() === '') return;
  const res = evaluate(expression);
  if (res !== null && typeof res === 'object' && 'error' in res) {
    setResult(res.error);
  } else {
    const resultStr = String(res);
    addHistoryEntry(expression, resultStr);
    setResult(resultStr);
    setExpression(resultStr);
  }
}

function doClear() {
  setExpression('');
  setResult('0');
}

function doBackspace() {
  setExpression(expression.slice(0, -1));
}

function doCopy() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(lastResult).catch(() => {});
  }
}

// ── Button click handler ───────────────────────────────────────────────────

function handleButtonClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  switch (action) {
    case 'digit':
    case 'decimal':
      appendDigit(value);
      break;
    case 'operator':
      appendOperator(value);
      break;
    case 'equals':
      doEquals();
      break;
    case 'clear':
      doClear();
      break;
    case 'backspace':
      doBackspace();
      break;
  }
}

// ── Keyboard handler ───────────────────────────────────────────────────────

function handleKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const key = e.key;

  if ((key >= '0' && key <= '9') || key === '.') {
    appendDigit(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    setExpression(expression + key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    doEquals();
  } else if (key === 'Backspace') {
    doBackspace();
  } else if (key === 'Escape') {
    doClear();
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  exprEl = document.getElementById('expression');
  resultEl = document.getElementById('result');
  historyListEl = document.getElementById('history-list');
  historyEmptyEl = document.getElementById('history-empty');
  copyBtn = document.getElementById('btn-copy');

  // Bind button grid
  document.querySelector('.btn-grid').addEventListener('click', handleButtonClick);

  // Bind copy button
  copyBtn.addEventListener('click', doCopy);

  // Keyboard support
  document.addEventListener('keydown', handleKeydown);

  // Load and render persisted history
  renderHistory(loadHistory());
});
