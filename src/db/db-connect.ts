import { drizzle } from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgresql://kayode:xbQqndwd9nO1R8T9skcBAP5JTxyHYHog@dpg-cu23b71u0jms738nfnt0-a/investment_app_xxjq");
// postgresql://tobi:NGgTeFxG3WiHmLAh44yVMPYPYq502MzY@dpg-cstkfhogph6c739frsng-a/invetment
export const db = drizzle(queryClient);