+16
-0

import { defineConfig } from 'checkly';

export default defineConfig({
  projectName: 'tiopelotte-e2e',
  logicalId: 'tiopelotte-e2e',
  repo: '.',
  checks: {
    browserChecks: {
      testMatch: 'tests/e2e/**/*.spec.ts',
      env: {
        BASE_URL: process.env.BASE_URL || 'https://<mi-dominio>',
        API_BASE_URL: process.env.API_BASE_URL || 'https://<mi-dominio>'
      }
    }
  }
});
