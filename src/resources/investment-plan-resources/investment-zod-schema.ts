import { z } from "zod";
import { INVESTMENT_ENUM_CONFIG } from "./constants";
import { investnmentPlanB } from "../../schemas";
import { InferInsertModel } from "drizzle-orm";


const { COINS, DURATION, INVESTMENT_PLAN_TYPE } = INVESTMENT_ENUM_CONFIG

export const investMentZodSchema = z.object({
    coinsType: z.enum(COINS),
    investMentDuration: z.enum(DURATION),
    amount: z.number().min(1, { message: 'amount must be at least one charcaters' })
})

export type TInvestment = InferInsertModel<typeof investnmentPlanB> 