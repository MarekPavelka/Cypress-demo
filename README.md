# Cypress UI & API tests

## Overview

This repository is a Cypress test automation project covering end-to-end scenarios for:

- **UI** – [Sauce Demo](https://www.saucedemo.com/)
- **API** – [ReqRes](https://reqres.in/)

It demonstrates a practical TypeScript + Cypress setup with Page Object Model structure, schema validation, tag filtering, xml test reports, process environment variables and session-cached login.

---

## Tech stack

- Cypress
- TypeScript
- [zod](https://www.npmjs.com/package/zod) (API response schemas)
- [@cypress/grep](https://www.npmjs.com/package/@cypress/grep) (tag filters)
- [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters) + [mocha-junit-reporter](https://www.npmjs.com/package/mocha-junit-reporter) (JUnit XML alongside default terminal output)
- [junit-merge](https://www.npmjs.com/package/junit-merge) (combine per spec XML into one file)
- [rimraf](https://www.npmjs.com/package/rimraf) (cross-platform `rm -rf` equivalent, cleans the report folder on Windows, macOS, and Linux without shell specific commands)

---

## Test areas

**UI**

1. Login – valid / invalid / missing credentials, session guard
2. Menu – open/close, all menu items functionality
3. Products – sort by name and price
4. Cart – add/remove, badge, cart page, refresh
5. Checkout – step-one validation, step-two overview, finish

**API**

1. list users (incl. paging)
2. create/update/delete user
3. performance

More detail per area: `cypress/e2e/**/` `*.md` files next to specs.

---

## Project structure

```
cypress/
  e2e/
    api/
      1-users/            # ReqRes users API specs + schemas
    ui/
      1-login/            # Login flow
      2-menu/             # Burger menu functionality
      3-product/          # Product sorting
      4-cart/             # Cart flow
      5-checkout/         # Checkout flow
  pages/                  # Page objects
  support/
    api/                  # api helpers
    ui/                   # ui helpers
    shared/               # shared helpers with no cy dependency
    commands.ts           # custom commands (e.g. ui login)
    e2e.ts                # loads @cypress/grep + commands
  test-results/           # JUnit XML (gitignored); created when running headless with reporters
reporter-config.json      # multi-reporter: spec + mocha-junit-reporter
cypress.config.ts         # main config
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/MarekPavelka/Cypress-demo.git
cd Cypress-demo
npm install
```

---

## Environment variables

Required depending on what tests you run. Variables are read from the **process environment** and then mapped into Cypress env.

| Variable         | Required for | Used for                                |
| ---------------- | ------------ | --------------------------------------- |
| `USER_NAME`      | UI tests     | Sauce Demo login username               |
| `PASSWORD`       | UI tests     | Sauce Demo login password               |
| `REQRES_API_KEY` | API tests    | ReqRes `x-api-key` header for API tests |

PowerShell (Windows)

```powershell
$env:USER_NAME = "<your-saucedemo-username>"
$env:PASSWORD = "<your-saucedemo-password>"
$env:REQRES_API_KEY = "<your-reqres-api-key>"
npx cypress run
```

CMD (Windows)

```cmd
set USER_NAME=<your-saucedemo-username>
set PASSWORD=<your-saucedemo-password>
set REQRES_API_KEY=<your-reqres-api-key>
npx cypress run
```

macOS/Linux (bash/zsh)

```bash
export USER_NAME="<your-saucedemo-username>"
export PASSWORD="<your-saucedemo-password>"
export REQRES_API_KEY="<your-reqres-api-key>"
npx cypress run
```

`$env:` / `set` / `export` are session-scoped (available in the current terminal session).

---

## Running tests

**Open Cypress (interactive)**

```bash
npx cypress open
```

**Run all specs (headless)**

```bash
npx cypress run
```

**Filter by tags**

Used tags in this project:

- `@ui` - UI test suites
- `@api` - API test suites
- `@smoke` - smoke coverage across UI and API
- `@perf` - API performance checks

You can combine tags as needed:

```bash
# All UI tests
npx cypress run --env grepTags='@ui'

# UI smoke tests
npx cypress run --env grepTags='@ui+@smoke'

# All API tests
npx cypress run --env grepTags='@api'

# API performance tests
npx cypress run --env grepTags='@api+@perf'
```

---

## JUnit XML reports

Headless runs use multiple reporters, so you keep the default **spec** reporter in the terminal and also get **JUnit XML** files for CI or dashboards.

Reporter wiring: `cypress.config.ts` → `cypress-multi-reporters` → `reporter-config.json`<br>
Per-spec XML: `cypress/test-results/results-[hash].xml`<br>
Merged XML: `cypress/test-results/results.xml` (after the merge script)

The `test-results` folder is listed in `.gitignore`.

**Scripts**

| Script                                | Purpose                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| <code>npm&nbsp;run&nbsp;cy:run</code> | Headless Cypress via Node (`spawnSync`), same reporters as `npx cypress run` (spec + JUnit XML). |
| <code>npm&nbsp;run&nbsp;cy:all</code> | Cleans XML (`rimraf`), runs `cy:run`, merges `results-*.xml` into `results.xml`.                 |

`cy:run` avoids shell-specific `npx` quirks so one npm script works on Windows and Unix. The wrapper does **not** forward Cypress’s exit code, so `cy:all` still runs `junit:merge` after a failing run and merged XML remains available.

Use `npm run cy:all` when you want a clean folder and a single merged XML artifact. For CI jobs that must fail when tests fail, rely on spec reporter output or the JUnit XML.

---

## Authentication & API access

- **UI:** custom `cy.loginUiSession()` (session-cached) and `cy.loginUiFresh()` (fresh login flow) commands use process environment variables `USER_NAME` / `PASSWORD`.
- **API:** custom http client uses process environment variable `REQRES_API_KEY` as `x-api-key` header value.
