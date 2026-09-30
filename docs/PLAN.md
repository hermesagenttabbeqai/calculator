# Calculator — Development Plan

Based on BRD version: v1 · Date: 2026-10-01 · Plan version: v1

---

## Architecture

| File | Purpose |
|---|---|
| `public/index.html` | App shell: calculator layout, display area, button grid, history panel |
| `public/css/style.css` | Dark-theme styles, responsive layout (mobile ≥ 320 px, desktop) |
| `public/js/engine.js` | Pure logic: parse expression, evaluate, validate, handle edge cases |
| `public/js/app.js` | UI glue: bind buttons, keyboard events, history, clipboard, localStorage |
| `tests/engine.test.js` | Unit tests for engine.js using node:test |

---

## Tasks

### T1: Calculation engine
- **Goal:** Implement and test the pure arithmetic logic.
- **BRD IDs:** BR-02, BR-04, BR-07, BR-08
- **Files:** `public/js/engine.js`, `tests/engine.test.js`
- **Acceptance tests:**
  - `evaluate("3+4")` returns `7`
  - `evaluate("10/2")` returns `5`
  - `evaluate("6*7")` returns `42`
  - `evaluate("9-5")` returns `4`
  - `evaluate("5/0")` returns `{ error: "Cannot divide by 0" }`
  - `evaluate("5++3")` returns `{ error: "Invalid input" }`
  - `evaluate("")` returns `{ error: "Invalid input" }`
  - `evaluate("1000000000*1000000000")` returns a value truncated to 10 significant digits
- **Depends on:** none

### T2: HTML layout and CSS
- **Goal:** Build the page structure and dark-theme styles; no JavaScript behaviour yet.
- **BRD IDs:** BR-01, BR-03, BR-05, BR-06, BR-10, BR-11, NFR-02, NFR-03, NFR-04, NFR-05
- **Files:** `public/index.html`, `public/css/style.css`
- **Acceptance tests:**
  - Page renders in Chrome, Firefox, Safari, Edge without errors.
  - All 17 buttons (0–9, +, −, ×, ÷, =, C, ⌫) are visible and labeled.
  - Display area shows two lines (expression and result).
  - History panel exists below the calculator and is visually distinct.
  - Copy button is present next to the result.
  - On a 375 px viewport the layout fits without horizontal scrolling.
  - Text contrast passes WCAG AA (≥ 4.5:1 for normal text).
- **Depends on:** none (can run in parallel with T1)

### T3: UI behaviour and wiring
- **Goal:** Connect engine to the page, add keyboard support, history, and clipboard.
- **BRD IDs:** BR-01, BR-03, BR-04, BR-05, BR-06, BR-09, BR-10, BR-11, BR-12, NFR-06
- **Files:** `public/js/app.js`
- **Acceptance tests:**
  - Clicking digit and operator buttons updates the expression display.
  - Pressing "=" calls `evaluate()` and shows the result; if error, shows the message.
  - "C" clears display and resets internal state.
  - "⌫" removes the last character from the expression.
  - Physical keyboard digits, +, -, *, /, Enter, Backspace, Escape all work.
  - "Copy" button copies the displayed result to clipboard.
  - After "=" the last calculation appears at the top of the history panel (max 5 entries).
  - History entries persist after a page reload (localStorage).
  - Clicking a history entry loads its result into the display.
- **Depends on:** T1 (engine.js must exist), T2 (HTML must exist)

---

## Coverage

| BRD ID | Task(s) |
|---|---|
| BR-01 | T2, T3 |
| BR-02 | T1 |
| BR-03 | T2, T3 |
| BR-04 | T1, T3 |
| BR-05 | T2, T3 |
| BR-06 | T2, T3 |
| BR-07 | T1, T3 |
| BR-08 | T1, T3 |
| BR-09 | T3 |
| BR-10 | T2, T3 |
| BR-11 | T2, T3 |
| BR-12 | T3 |
| NFR-01 | T2 (no heavy assets) |
| NFR-02 | T2 |
| NFR-03 | T2 |
| NFR-04 | T2 |
| NFR-05 | T2 |
| NFR-06 | T3 |

---

## Risks and open questions

- **Floating-point precision:** JavaScript `eval` or manual parsing can produce results like `0.1 + 0.2 = 0.30000000000000004`. Engine must round to 10 significant digits.
- **Expression parsing:** Using `Function()` for evaluation is simple but must be sandboxed carefully to block arbitrary code. Alternative: write a simple recursive-descent parser (chosen approach, safer).
- **Mobile keyboard pop-up:** On mobile, tapping buttons should NOT trigger the software keyboard. Input field must be read-only or replaced with a `<div>` display.
