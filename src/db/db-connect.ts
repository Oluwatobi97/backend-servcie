import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://investment_epev_user:VvYMCzxcVF7vEVwV3udUwp0ULgYf13MF@dpg-cu4n1bqj1k6c738pscc0-a/investment_epev");

export const db = drizzle(queryClient);
