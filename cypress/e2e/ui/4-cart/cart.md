# Cart - Test Scenarios

SUT: `https://www.saucedemo.com/`
Page object: `cypress/pages/cart.page.ts`  
Spec file: `cypress/e2e/4-cart/cart.spec.ts`

---

## Test Data

- Environment variables: `USER_NAME`, `PASSWORD`

## Precondition

- Navigate to SUT
- Login with `standard_user`  
- Confirm user lands on inventory page (`/inventory.html`)

---

## Functional Scenarios

| ID      | Scenario                                                | Priority | Expected Result                                                                   |
| ------- | ------------------------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| CRT-001 | Cart icon visible after login                           | High     | Cart icon is displayed in header on inventory page                                |
| CRT-002 | Empty cart has no badge                                 | High     | Badge is not visible when cart has 0 items                                        |
| CRT-003 | Add one product from inventory                          | High     | Selected product button changes to `Remove` and badge shows `1`                   |
| CRT-004 | Add second different product from inventory             | High     | Second product changes to `Remove` and badge updates to `2`                       |
| CRT-005 | Remove one product from inventory                       | High     | Removed product button returns to `Add to cart` and badge decrements (`2` -> `1`) |
| CRT-006 | Remove last product from inventory                      | High     | Last product removed, badge disappears (no `0` badge shown)                       |
| CRT-007 | Open cart with products added                           | High     | Cart page opens (`/cart.html`) and displays the exact added products              |
| CRT-008 | Remove product from cart page                           | High     | Item is removed from cart list and badge updates accordingly                      |
| CRT-009 | Continue Shopping from cart                             | Medium   | Returns to inventory page while keeping current cart state                        |
| CRT-010 | Navigate inventory -> cart -> inventory preserves state | High     | Product button states and badge count stay consistent across navigation           |
| CRT-011 | Add/remove same product multiple times                  | Medium   | Badge and button text remain accurate on each toggle                              |
| CRT-012 | Cart count equals number of unique added items          | Medium   | Badge value always matches number of items currently in cart                      |

---

## UI Scenarios

| ID         | Scenario                                      | Priority | Expected Result                                               |
| ---------- | --------------------------------------------- | -------- | ------------------------------------------------------------- |
| CRT-UI-001 | Cart page headers and columns are visible     | Low      | `Your Cart`, item details, and action controls are visible    |
| CRT-UI-002 | Added item details are correct in cart        | Medium   | Item name, price, and description match inventory data        |
| CRT-UI-003 | Remove button works for each listed cart item | Medium   | Clicking `Remove` on any line item removes that specific item |
| CRT-UI-004 | Empty cart view after removing all items      | Medium   | No cart items are shown and user can continue shopping        |

---

## Robustness Scenarios

| ID         | Scenario                                         | Priority | Expected Result                                                                |
| ---------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| CRT-RB-001 | Refresh inventory page after adding items        | Medium   | Cart state persists after refresh                                              |
| CRT-RB-002 | Refresh cart page after adding items             | Medium   | Cart items and badge count persist after refresh                               |
| CRT-RB-003 | Logout clears visible cart state for new session | High     | After logout and fresh login, previous cart state is not unexpectedly retained |

---

## Automation Scope

1. `CRT-002`, `CRT-003`, `CRT-004`, `CRT-005`, `CRT-006`
2. `CRT-007`, `CRT-008`, `CRT-010`
3. `CRT-012`
4. `CRT-RB-001`, `CRT-RB-002`
