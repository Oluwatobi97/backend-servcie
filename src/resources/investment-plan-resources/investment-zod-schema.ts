import { z } from "zod";
import { INVESTMENT_ENUM_CONFIG } from "./constants";


const { COINS, DURATION, INVESTMENT_PLAN_TYPE } = INVESTMENT_ENUM_CONFIG

export const investMentZodSchema = z.object({
    planType: z.enum(INVESTMENT_PLAN_TYPE),
    coinsType: z.enum(COINS),
    investMentDuration: z.enum(DURATION),
    amount: z.number().min(1, { message: 'amount must be at least one charcaters' })
})

export type TInvestment = z.infer<typeof investMentZodSchema>