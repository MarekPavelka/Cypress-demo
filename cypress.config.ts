import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: false,
  expose: {
    reqresApiUrl: 'https://reqres.in/api',
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: [
      'cypress/e2e/ui/**/*.spec.{js,ts}',
      'cypress/e2e/api/**/*.spec.{js,ts}',
    ],
    setupNodeEvents(on, config) {
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin');
      cypressGrepPlugin(config);

      config.env.username = process.env.USER_NAME;
      config.env.password = process.env.PASSWORD;
      config.env.reqresApiKey = process.env.REQRES_API_KEY;

      return config;
    },
  },
});
