import { defineConfig } from 'cypress';
import dotenv from "dotenv";
dotenv.config({ path: `.env.local` })

export default defineConfig({
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: process.env.DOMAIN,
    auth0_client_id: process.env.CLIENT_ID,
    lnkdn_user: process.env.LNKDN_USER,
    lnkdn_pwd: process.env.LNKDN_PWD,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'https://auth0-vue-sample.netlify.app/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalModifyObstructiveThirdPartyCode: true,
  }
});
