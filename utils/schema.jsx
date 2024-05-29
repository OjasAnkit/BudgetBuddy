import { PgTable, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// defining the schema

export const categories=pgTable('categories_db',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull().unique,
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

export default categories