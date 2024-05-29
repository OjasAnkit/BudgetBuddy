import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories } from './schema';

const sql = neon(process.env.POSTGRES_DB_URL);
const db = drizzle(sql,{categories});