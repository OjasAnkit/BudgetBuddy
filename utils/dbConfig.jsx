import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { categories } from './schema';

const sql = neon('postgresql://budget_buddy_db_owner:Cmy2VWOJHu0D@ep-black-recipe-a1ngnpku.ap-southeast-1.aws.neon.tech/budget_buddy_db?sslmode=require');
export const db = drizzle(sql,{categories});