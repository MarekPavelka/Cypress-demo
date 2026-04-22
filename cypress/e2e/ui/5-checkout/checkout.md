# Checkout - Test Scenarios

SUT: `https://www.saucedemo.com/`
Page object: `cypress/pages/checkout.page.ts`  
Spec file: `cypress/e2e/5-checkout/checkout.spec.ts`

---

## Test Data

- Environment variables: `USER_NAME`, `PASSWORD`

## Precondition

- Navigate to SUT
- Login with `standard_user`  
- Confirm user lands on inventory page (`/inventory.html`)

---

## Functional Scenarios

| ID      | Scenario                                         | Priority | Expected Result                                                           |
| ------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------- |
| CHK-001 | Add one product and start checkout               | High     | Product is added, badge shows `1`, checkout starts from cart page         |
| CHK-002 | Add multiple products and start checkout         | High     | Multiple items are visible in cart and checkout can be initiated          |
| CHK-003 | Checkout step one page opens correctly           | High     | URL is `/checkout-step-one.html` and personal information form is visible |
| CHK-004 | Step one validation - all fields empty           | High     | Error message appears and user remains on step one                        |
| CHK-005 | Step one validation - missing first name         | High     | Error indicates first name is required                                    |
| CHK-006 | Step one validation - missing last name          | High     | Error indicates last name is required                                     |
| CHK-007 | Step one validation - missing postal code        | High     | Error indicates postal code is required                                   |
| CHK-008 | Step one submit with valid personal info         | High     | User proceeds to step two (`/checkout-step-two.html`)                     |
| CHK-009 | Cancel from step one                             | Medium   | Returns to cart page without completing checkout                          |
| CHK-010 | Step two shows correct list of selected products | High     | Only added products are listed with correct names and prices              |
| CHK-011 | Step two item total is correct                   | High     | `Item total` equals sum of listed product prices                          |
| CHK-012 | Step two tax and total are calculated correctly  | High     | `Total` equals `Item total + Tax`                                         |
| CHK-013 | Finish checkout from step two                    | High     | User is redirected to `/checkout-complete.html`                           |
| CHK-014 | Success message after finishing order            | High     | Confirmation message is displayed (order complete/thank you text)         |
| CHK-015 | Back Home from checkout complete page            | High     | User returns to inventory page (`/inventory.html`)                        |
| CHK-016 | Cart badge reset after successful order          | Medium   | Cart is cleared and badge is not displayed after completion               |

---

## Input Scenarios (Step One)

| ID          | Scenario                                | Priority | Expected Result                                          |
| ----------- | --------------------------------------- | -------- | -------------------------------------------------------- |
| CHK-INF-001 | Fill first name, last name, postal code | High     | Inputs accept values and keep entered text               |
| CHK-INF-002 | Leading/trailing spaces in inputs       | Low      | Inputs are handled gracefully and do not break checkout  |
| CHK-INF-003 | Alphanumeric postal code format         | Medium   | Valid postal code formats can proceed to step two        |
| CHK-INF-004 | Error state can be corrected            | Medium   | After fixing missing field(s), form submits successfully |
| CHK-INF-005 | Error message can be dismissed          | Low      | Error close button hides validation message              |

---

## Navigation and Robustness Scenarios

| ID         | Scenario                                    | Priority | Expected Result                                                |
| ---------- | ------------------------------------------- | -------- | -------------------------------------------------------------- |
| CHK-RB-001 | Continue Shopping from cart before checkout | Medium   | Returns to inventory and preserves selected cart items         |
| CHK-RB-002 | Cancel from step two                        | Medium   | Returns to inventory without finishing the order               |
| CHK-RB-003 | Refresh on step two                         | Low      | Checkout overview remains stable and totals stay correct       |
| CHK-RB-004 | Checkout cannot start with empty cart       | Medium   | Checkout entry is blocked or handled safely when cart is empty |

---

## Automation Scope

1. `CHK-001`, `CHK-002`, `CHK-003`
2. `CHK-004`, `CHK-005`, `CHK-006`, `CHK-007`, `CHK-008`
3. `CHK-010`, `CHK-011`, `CHK-012`
4. `CHK-013`, `CHK-014`, `CHK-015`, `CHK-016`
