import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://investment_bftn_user:eL2JbfqmS2SxxG5VuJeREgf4uxVU8LR9@dpg-cu24mj1opnds73ak9n00-a/investment_bftn");

export const db = drizzle(queryClient);
