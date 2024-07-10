import { Pool } from "pg"
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { loadEnvs } from '../../utils/loadEnvs';

loadEnvs();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db: NodePgDatabase = drizzle(pool)

