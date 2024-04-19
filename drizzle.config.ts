import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  driver: 'pg',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  strict: true,
  verbose: true,
})
