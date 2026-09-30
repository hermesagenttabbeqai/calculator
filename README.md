# Calculator

A clean, dark-themed basic calculator web app. Runs entirely in the browser — no server, no login.

🔗 **Live app:** https://hermesagenttabbeqai.github.io/calculator/
📦 **Repository:** https://github.com/hermesagenttabbeqai/calculator

---

## Features

- Addition, subtraction, multiplication, division
- Full keyboard support (digits, operators, Enter, Backspace, Escape)
- Copy result to clipboard
- Last 5 calculations in a history panel (persists across reloads)
- Friendly error messages for invalid input and division by zero
- Responsive dark theme — works on mobile (≥ 320 px) and desktop

## File structure

```
public/
  index.html        — App shell
  css/style.css     — Dark theme, responsive layout
  js/
    engine.js       — Pure arithmetic engine (no eval)
    app.js          — UI wiring, keyboard, clipboard, history
tests/
  engine.test.js    — Unit tests (node:test)
docs/
  BRD.md            — Business Requirements Document
  PLAN.md           — Development plan
  approvals.md      — Approval log
  USER_GUIDE.md     — End-user guide
```

## Running the tests

```bash
npm test
```

Requires Node.js 18 or later. All tests run in the `tests/` folder using the built-in `node:test` runner.
