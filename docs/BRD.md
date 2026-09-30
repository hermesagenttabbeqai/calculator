# Business Requirements Document — Calculator

| Field | Value |
|---|---|
| Project | calculator |
| Requester | Mhmd H |
| Date | 2026-10-01 |
| Version | v1 |

---

## 1 Summary

A clean, dark-themed basic calculator web app for the general public. It runs entirely in the browser with no server or login required. Users can perform the four arithmetic operations quickly and intuitively on any device.

---

## 2 Users and Goals

| User | Goal |
|---|---|
| General public | Perform quick arithmetic (addition, subtraction, multiplication, division) without leaving the browser |

---

## 3 Functional Requirements

| ID | Requirement |
|---|---|
| BR-01 | The user can enter numbers using on-screen buttons. |
| BR-02 | The user can perform addition (+), subtraction (−), multiplication (×), and division (÷). |
| BR-03 | The app shows the current expression and the running result in a display area. |
| BR-04 | The user can press "=" (or Enter) to compute and display the final result. |
| BR-05 | The user can press "C" (Clear) to reset the calculator to its initial state. |
| BR-06 | The user can press "⌫" (Backspace) to delete the last entered digit or character. |
| BR-07 | The app prevents invalid expressions (e.g. two operators in a row, leading operator) and shows a user-friendly error message ("Invalid input"). |
| BR-08 | The app handles division by zero and shows the message "Cannot divide by 0". |
| BR-09 | The user can use the physical keyboard (digits 0–9, +, −, *, /, Enter, Backspace, Escape for Clear) to operate the calculator. |
| BR-10 | The user can click a "Copy" button to copy the current result to the clipboard. |
| BR-11 | The app shows the last 5 calculations in a history panel below the calculator. |
| BR-12 | The user can click a history entry to load its result back into the display. |

---

## 4 Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | The app loads in under 2 seconds on a standard broadband connection. |
| NFR-02 | The app is fully usable on mobile screens (min 320 px wide). |
| NFR-03 | The app is fully usable on desktop screens. |
| NFR-04 | The app works in the latest versions of Chrome, Firefox, Safari, and Edge. |
| NFR-05 | Color contrast meets WCAG AA for text on dark background. |
| NFR-06 | Calculation history is stored in localStorage and persists across page reloads. |

---

## 5 Recommendations Accepted

| Feature | Reason |
|---|---|
| Keyboard support (BR-09) | Speeds up usage for desktop users; standard expectation for a calculator. |
| Copy result button (BR-10) | Lets users paste the result into other apps without manual selection. |
| Calculation history (BR-11, BR-12) | Lets users review recent calculations without re-entering them. |

---

## 6 Assumptions

- No unit conversions, currency, or scientific functions are needed.
- History panel is collapsed/hidden by default on mobile to save space.
- Results are displayed with up to 10 significant digits to avoid overflow.
- No theming toggle is required; dark theme is the only mode.

---

## 7 Out of Scope

- Scientific / programming calculator functions (sin, cos, log, hex, etc.)
- User accounts, login, or cloud sync
- Server-side code or database
- Payment or monetisation features
- Multiple language / localisation support

---

## 8 Acceptance Checklist

- [ ] All four operations produce the correct result.
- [ ] "C" resets the display completely.
- [ ] "⌫" removes the last character.
- [ ] Division by zero shows the correct error message.
- [ ] Invalid input (e.g. "5 + + 3") shows the correct error message.
- [ ] Keyboard keys (digits, operators, Enter, Backspace, Escape) work as expected.
- [ ] "Copy" button copies the result to clipboard.
- [ ] History panel shows the last 5 calculations after "=" is pressed.
- [ ] Clicking a history entry loads its result.
- [ ] History survives a page reload (localStorage).
- [ ] App is usable on a 375 px wide mobile screen.
- [ ] App is deployed and accessible at the GitHub Pages URL.
