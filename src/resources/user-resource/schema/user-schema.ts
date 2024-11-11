import {pgTable, text, serial} from "drizzle-orm/pg-core";

export const UserTable = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
})

// export const productSchema = pgTable('products', {
//     id: uuid('id').notNull().primaryKey(),
//     email: text('email').unique().notNull(),
//     password: text('password').unique().notNull(),
// })
