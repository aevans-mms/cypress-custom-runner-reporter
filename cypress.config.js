const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kg911z',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
