# Menu - Test Scenarios

SUT: `https://www.saucedemo.com/`
Page object: `cypress/pages/home.page.ts`  
Spec file: `cypress/e2e/2-menu/menu.spec.ts`

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
| MNU-001 | Open burger menu from inventory page | High | Side menu opens after clicking top-left burger button |
| MNU-002 | Close menu with X button | High | Side menu closes and inventory page remains visible |
| MNU-003 | Menu shows expected options | High | `All Items`, `About`, `Logout`, `Reset App State` are visible |
| MNU-004 | Click `All Items` from invetory item page (`inventory-item.html`) | Medium | User returns to inventory page (`/inventory.html`) |
| MNU-005 | Click `About` | Medium | User is redirected to Sauce Labs page (`https://saucelabs.com/`) |
| MNU-006 | Click `Logout` | High | User is redirected to login page (`/`) and session is ended |
| MNU-007 | Re-login after logout works | High | Login again with `standard_user` succeeds and opens inventory |
| MNU-008 | Click `Reset App State` with modified cart state | High | Cart state is cleared (badge removed / count reset) |
| MNU-009 | `Reset App State` does not log out user | Medium | User remains authenticated on inventory page |
| MNU-010 | Menu can be opened/closed repeatedly | Medium | No UI break; menu behavior remains stable across multiple toggles |

---

## UI Scenarios

| ID | Scenario | Priority | Expected Result |
|---|---|---|---|
| MNU-UI-001 | Burger button is visible after login | High | Burger icon is displayed in top-left header area |
| MNU-UI-002 | Close button visible when menu is open | Medium | X/close button is present and clickable |
| MNU-UI-003 | Menu overlay and panel styling | Low | Open menu appears above content with readable labels |
| MNU-UI-004 | Keyboard interaction on menu controls | Low | Enter/Space triggers menu controls (if keyboard support is implemented) |

---

## Automation Scope

1. `MNU-001`, `MNU-002`, `MNU-003`
2. `MNU-005`
3. `MNU-006`, `MNU-007`
4. `MNU-008`, `MNU-009`