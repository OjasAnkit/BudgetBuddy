import { PgTable, integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

// defining the schema

export const categories=pgTable('categories_db',{
    id:serial('id').primaryKey(),
    name:text('name').notNull().unique(),
    amount:text('amount').notNull(),
    icon:text('icon'),
    createdBy:text('createdBy').notNull()
})

export const expenses=pgTable('expenses_db',{
    id:serial('id').primaryKey(),
    name:text('name').notNull(),
    amount:text('amount').notNull().default(0),
    category_id:integer('category_id').references(()=>categories.id),
    createdAt:text('createdAt').notNull()
})

export default categories