import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { coins, duration, investMentPlanType } from "../../../schemas";



export const investMentPlanTable = pgTable('investnment-plan', {
    id: serial('id').primaryKey(),
    planType: investMentPlanType('planType'),
    coinsType: coins('coinsType'),
    investMentDuration: duration('investMentDuration'),
    amount: integer('amount')
})