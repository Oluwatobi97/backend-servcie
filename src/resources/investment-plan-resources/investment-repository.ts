

//  this is the file that would handle all the database action

import { db } from "../../db/db-connect";
import { investnmentPlanB } from "../../schemas";
import { UserRepository } from "../user-resource/repsository/user-repository";
import { TInvestment } from "./investment-zod-schema";
import { eq } from "drizzle-orm";


const userReop = new UserRepository()


export class InvestmentPLansRepository {

    async getAllInvestmentPlans (userId: number) {
        return await db.select().from(investnmentPlanB).where(eq(investnmentPlanB.userId, userId)).limit(4).offset(4)
    }

    async getInvestmentPlanById (id: number) {
        return await db.select().from(investnmentPlanB).where(eq(investnmentPlanB, id))
    }

    async createInvestMentPlan (newPlan: TInvestment, userId: number) {
        return await db.insert(investnmentPlanB).values({ ...newPlan, userId })
    }

    async updateInvestMentPlan (newPlanInfo: Partial<TInvestment>, userId: number) {
        return await db.update(investnmentPlanB).set({ ...newPlanInfo }).where(eq(investnmentPlanB.userId, userId))
    }
    async deleteInvestmentPlan (id: number) {
        return await db.delete(investnmentPlanB).where(eq(investnmentPlanB.id, id))
    }
}