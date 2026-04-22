# Login - Test Scenarios

SUT: `https://www.saucedemo.com/`  
Page object: `cypress/pages/login.page.ts`  
Spec file: `cypress/e2e/1-login/login.spec.ts`

---

## Test Data

- Valid user: `standard_user`
- Performance user: `performance_glitch_user`
- Locked user: `locked_out_user`

---

## Functional Scenarios

| ID      | Scenario                            | Priority | Expected Result                                                         |
| ------- | ----------------------------------- | -------- | ----------------------------------------------------------------------- |
| LGN-001 | Open login page                     | High     | Login form is visible with Username, Password, and Login button         |
| LGN-002 | Login with Valid user               | High     | Redirect to inventory page (`/inventory.html`)                          |
| LGN-003 | Login with Performance user         | Medium   | Login succeeds and user lands on inventory page (allow slower response) |
| LGN-004 | Login with Locked user              | High     | Login fails and locked-out error message is displayed                   |
| LGN-005 | Invalid username + valid password   | High     | Login fails and generic credential error is displayed                   |
| LGN-006 | Valid username + invalid password   | High     | Login fails and generic credential error is displayed                   |
| LGN-007 | Invalid username + invalid password | High     | Login fails and generic credential error is displayed                   |
| LGN-008 | Empty username + empty password     | High     | Validation error: username is required                                  |
| LGN-009 | Empty username + filled password    | High     | Validation error: username is required                                  |
| LGN-010 | Filled username + empty password    | High     | Validation error: password is required                                  |
| LGN-011 | Password field is masked            | Medium   | Typed password is hidden (not plain text)                               |
| LGN-012 | Error message can be dismissed      | Medium   | Clicking close icon hides error message                                 |
| LGN-013 | Press Enter submits login form      | Medium   | Enter key triggers same behavior as clicking Login                      |

---

## UI Scenarios

| ID         | Scenario                      | Priority | Expected Result                                                 |
| ---------- | ----------------------------- | -------- | --------------------------------------------------------------- |
| LGN-UI-001 | Login page branding and title | Low      | Swag Labs branding/logo is displayed                            |
| LGN-UI-002 | Placeholder text in inputs    | Low      | Username and Password placeholders are present and readable     |
| LGN-UI-003 | Login button state on load    | Low      | Login button is enabled on initial load                         |
| LGN-UI-004 | Error message visual state    | Low      | Error container is clearly visible with proper styling and icon |

---

## Session and Navigation Scenarios

| ID          | Scenario                                     | Priority | Expected Result                                                      |
| ----------- | -------------------------------------------- | -------- | -------------------------------------------------------------------- |
| LGN-SES-001 | Direct access to inventory without login     | High     | User is redirected to login page                                     |
| LGN-SES-002 | Successful login keeps authenticated session | High     | Refresh on inventory page keeps user logged in                       |
| LGN-SES-003 | Logout returns to login page                 | High     | User is redirected to login and cannot access inventory after logout |

---

## Automation Scope

1. `LGN-001`, `LGN-002`
2. `LGN-005`, `LGN-006`, `LGN-007`
3. `LGN-008`, `LGN-009`, `LGN-010`
4. `LGN-SES-001`
