import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
<<<<<<< mpa-demo
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: [
      'cypress/e2e/ui/1-login/**/*.{js,ts}',
      'cypress/e2e/ui/2-menu/**/*.{js,ts}',
      'cypress/e2e/ui/3-product/**/*.{js,ts}',
      'cypress/e2e/ui/4-cart/**/*.{js,ts}',
      'cypress/e2e/ui/5-checkout/**/*.{js,ts}',
      'cypress/e2e/ui/**/*.{js,ts}',
      'cypress/e2e/api/**/*.{js,ts}',
    ],
=======
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.{js,ts}',
>>>>>>> main
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
