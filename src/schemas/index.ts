import { pgTable, unique, serial, integer, timestamp, text, pgEnum } from "drizzle-orm/pg-core"

export const coins = pgEnum("coins", [ 'BTC', 'ETH', 'USDT' ])
export const duration = pgEnum("duration", [ '1-day', '1-month', '3-month', '6-month', '1-year' ])
export const investment = pgEnum("investment", [ 'Gold', 'Silver', 'Bronze' ])




export const users = pgTable("users", {
    id: serial().primaryKey().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    createdAt: timestamp("created-at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated-at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const investnmentPlanB = pgTable("investnment-planB", {
    id: serial().primaryKey().notNull(),
    planType: investment().notNull(),
    coinsType: coins().notNull(),
    investMentDuration: duration().notNull(),
    amount: integer().notNull(),
    createdAt: timestamp("created-at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated-at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    userId: integer().references(() => users.id),
});

