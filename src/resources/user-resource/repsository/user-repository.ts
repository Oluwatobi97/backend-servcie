import { number, z } from "zod";
import { db } from "../../../db/db-connect";
import { UserTable } from "../schema/user-schema";
import { zodUserSchema } from "../zod/user-zod-schema";
import { TUser } from "../types";
import { eq } from "drizzle-orm";


// i want to create a function called dbActions
// this will encaspulate ever db Action
// we will need db, the table the action


// type TActionType = 'insert' | 'delete' | 'select' | 'update'

// function dbActions(action: PgSelectBuilder<undefined>) {
//     db['insert'] = action
// }


export class UserRepository {

    creatUser = async (newUser: TUser) => {
        return await db.insert(UserTable).values(newUser).returning()
    }

    findUserByEmail = async (email: string) => {
        return await db.select().from(UserTable).where(eq(UserTable.email, email))
    }
    findUserById = async (id: number) => {
        return await db.select().from(UserTable).where(eq(UserTable.id, id))

    }
}