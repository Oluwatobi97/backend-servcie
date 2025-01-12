import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://investment_5529_user:FZk0vtlfgGd6aJb5uhLEwqaH7LnTLPD1@dpg-cu0gna1u0jms73d18lfg-a/investment_5529");

export const db = drizzle(queryClient);
