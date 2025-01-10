import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://kayode:mUTCPeinys3Bd5CNpiB1WzcqG9nqQgYw@dpg-cu0fq65ds78s73dd7di0-a/investment_app_2lk2");
// postgresql://tobi:NGgTeFxG3WiHmLAh44yVMPYPYq502MzY@dpg-cstkfhogph6c739frsng-a/invetment
export const db = drizzle(queryClient);