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

| ID      | Scenario                                                     | Priority | Expected Result                                                            |
| ------- | ------------------------------------------------------------ | -------- | -------------------------------------------------------------------------- |
| SRT-001 | Sort dropdown is visible after login                         | High     | Product sort control is visible in top-right inventory header              |
| SRT-002 | Default selected sort option on first load                   | High     | Default value is `Name (A to Z)`                                           |
| SRT-003 | Sort by `Name (A to Z)`                                      | High     | Product names are listed in ascending alphabetical order                   |
| SRT-004 | Sort by `Name (Z to A)`                                      | High     | Product names are listed in descending alphabetical order                  |
| SRT-005 | Sort by `Price (low to high)`                                | High     | Product prices are listed from lowest to highest                           |
| SRT-006 | Sort by `Price (high to low)`                                | High     | Product prices are listed from highest to lowest                           |
| SRT-007 | Switching sort options updates product order each time       | High     | Product list reorders immediately and correctly after each selection       |
| SRT-008 | Sort order resets after page refresh                         | Medium   | Selected option is not active anymore and product order changes to default |
| SRT-009 | Sort order resets when opening product details and returning | Medium   | Returning to inventory resets previously selected sort option and order    |
| SRT-010 | Sort works with items present in cart                        | Medium   | Adding/removing cart items does not break sorting behavior                 |

---

## UI Scenarios

| ID         | Scenario                             | Priority | Expected Result                                                        |
| ---------- | ------------------------------------ | -------- | ---------------------------------------------------------------------- |
| SRT-UI-001 | Sort control styling and readability | Low      | Label and selected value are readable and not visually broken          |
| SRT-UI-002 | Dropdown interaction stability       | Low      | Opening/closing dropdown repeatedly does not cause UI glitches         |
| SRT-UI-003 | Empty or missing list safeguard      | Low      | If no products are visible, app handles state gracefully without crash |

---

## Dropdown Option Scenarios

| ID          | Option Label          | Priority | Expected Result                  |
| ----------- | --------------------- | -------- | -------------------------------- |
| SRT-OPT-001 | `Name (A to Z)`       | High     | Option is present and selectable |
| SRT-OPT-002 | `Name (Z to A)`       | High     | Option is present and selectable |
| SRT-OPT-003 | `Price (low to high)` | High     | Option is present and selectable |
| SRT-OPT-004 | `Price (high to low)` | High     | Option is present and selectable |

---

## Automation Scope

1. `SRT-001`, `SRT-002`
2. `SRT-003`, `SRT-004`, `SRT-005`, `SRT-006`
3. `SRT-007`
4. `SRT-008`
