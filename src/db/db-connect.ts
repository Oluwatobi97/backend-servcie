import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://tobi:NGgTeFxG3WiHmLAh44yVMPYPYq502MzY@dpg-cstkfhogph6c739frsng-a/invetment");

export const db = drizzle(queryClient);