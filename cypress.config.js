const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*', '**/spec.cy.js/*']
  },
})
