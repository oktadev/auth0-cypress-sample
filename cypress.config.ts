import { defineConfig } from 'cypress';
import dotenv from "dotenv";
dotenv.config({ path: `.env.local` })

export default defineConfig({
  env: {
    // Enter your env variables here
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'https://auth0-vue-sample.netlify.app/',
    viewportWidth: 1920,
    viewportHeight: 1080,
  }
});
