import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../database/schema'

export const tables = schema
export { sql, eq, and, or, asc, desc, sum, inArray } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL as string
const client = postgres(connectionString, { prepare: false })

export function useDB() {
	return drizzle(client, { schema })
}
