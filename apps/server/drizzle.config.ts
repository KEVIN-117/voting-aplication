import { defineConfig } from "drizzle-kit"
import { loadEnvs } from './src/utils/loadEnvs';
loadEnvs();
export default defineConfig({
  dialect: "postgresql",
  schema: './src/db/drizzle/schema.ts',
  out: './drizzle',
  dbCredentials:{
    url: process.env.DATABASE_URL,
  }
})

