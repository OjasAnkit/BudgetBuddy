import { defineConfig } from "drizzle-kit";

export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://budget_buddy_db_owner:Cmy2VWOJHu0D@ep-black-recipe-a1ngnpku.ap-southeast-1.aws.neon.tech/budget_buddy_db?sslmode=require',
    }
  };