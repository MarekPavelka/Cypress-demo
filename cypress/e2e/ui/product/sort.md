# Product Sort - Test Scenarios

SUT: `https://www.saucedemo.com/`
Page object: `cypress/pages/home.page.ts`  
Spec file: `cypress/e2e/3-product-sort/product-sort.spec.ts`

---

## Precondition

- Navigate to SUT
- Login with:
  - Username: `standard_user`  
- Confirm user lands on inventory page (`/inventory.html`)

---

## Functional Scenarios

| ID | Scenario | Priority | Expected Result |
|---|---|---|---|
| FLT-001 | Sort dropdown is visible after login | High | Product sort control is visible in top-right inventory header |
| FLT-002 | Default selected sort option on first load | High | Default value is `Name (A to Z)` |
| FLT-003 | Sort by `Name (A to Z)` | High | Product names are listed in ascending alphabetical order |
| FLT-004 | Sort by `Name (Z to A)` | High | Product names are listed in descending alphabetical order |
| FLT-005 | Sort by `Price (low to high)` | High | Product prices are listed from lowest to highest |
| FLT-006 | Sort by `Price (high to low)` | High | Product prices are listed from highest to lowest |
| FLT-007 | Switching sort options updates product order each time | High | Product list reorders immediately and correctly after each selection |
| FLT-008 | Sort order persists after page refresh | Medium | Selected option remains active and product order stays consistent |
| FLT-009 | Sort order persists when opening product details and returning | Medium | Returning to inventory keeps previously selected sort option and order |
| FLT-010 | Sort works with items present in cart | Medium | Adding/removing cart items does not break sorting behavior |

---

## UI Scenarios

| ID | Scenario | Priority | Expected Result |
|---|---|---|---|
| FLT-UI-001 | Sort control styling and readability | Low | Label and selected value are readable and not visually broken |
| FLT-UI-002 | Dropdown interaction stability | Low | Opening/closing dropdown repeatedly does not cause UI glitches |
| FLT-UI-003 | Empty or missing list safeguard | Low | If no products are visible, app handles state gracefully without crash |

---

## Dropdown Option Scenarios

| ID | Option Label | Priority | Expected Result |
|---|---|---|---|
| FLT-OPT-001 | `Name (A to Z)` | High | Option is present and selectable |
| FLT-OPT-002 | `Name (Z to A)` | High | Option is present and selectable |
| FLT-OPT-003 | `Price (low to high)` | High | Option is present and selectable |
| FLT-OPT-004 | `Price (high to low)` | High | Option is present and selectable |

---

## Automation Scope

1. `FLT-001`, `FLT-002`
2. `FLT-003`, `FLT-004`, `FLT-005`, `FLT-006`
3. `FLT-007`
4. `FLT-008`