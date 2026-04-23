# Users API - Test Scenarios

SUT: `https://reqres.in/`  
Endpoint base: `https://reqres.in/api`  
Spec file: `cypress/e2e/api/users.spec.ts`

---

## Test Data

- Environment variables: `REQRES_API_KEY`
- Users data source: `cypress/fixtures/api-users.json`

---

## Precondition

- Load test users from Users data source

---

## Functional Scenarios

| ID           | Scenario                                 | Priority | Expected Result                                                                 |
| ------------ | ---------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| API-GET-001  | GET users from first page (`GET /users`) | High     | Status `200`, total exists, first name and last name exists, data is valid      |
| API-GET-002  | GET users from all pages                 | High     | Status `200` on each page, merged user count matches total, user IDs are unique |
| API-POST-001 | Create user (`POST /users`)              | High     | Status `201`, returns user ID and created time, response contains payload data  |
| API-PUT-001  | Update user (`PUT /users/1`)             | High     | Status `200`, returns updated name, job, and valid updated time                 |
| API-DEL-001  | Delete user (`DELETE /users/1`)          | High     | Status `204`, response body is empty                                            |

---

## Performance Scenarios

| ID                | Scenario             | Priority | Expected Result                         |
| ----------------- | -------------------- | -------- | --------------------------------------- |
| API-PERF-POST-001 | POST response time   | Medium   | Response duration within time threshold |
| API-PERF-PUT-001  | PUT response time    | Medium   | Response duration within time threshold |
| API-PERF-DEL-001  | DELETE response time | Medium   | Response duration within time threshold |

---

## Automation Scope

1. `API-GET-001`, `API-GET-002`
2. `API-POST-001`
3. `API-PUT-001`
4. `API-DEL-001`
5. `API-PERF-POST-001`, `API-PERF-PUT-001`, `API-PERF-DEL-001`
