import {drizzle} from 'drizzle-orm/postgres-js'

import postgres from 'postgres';


const queryClient = postgres("postgres://postgres:Password@localhost:5432/MediaBoardCast");

export const db = drizzle(queryClient);