import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.{js,ts}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
