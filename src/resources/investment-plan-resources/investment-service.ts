import { JwtPayload } from "jsonwebtoken";
import { InvestmentPLansRepository } from "./investment-repository";
import { TInvestment } from "./investment-zod-schema";
import { UserRepository } from "../user-resource/repsository/user-repository";

export class InvestMentPlanService {
    investMentPlansRepository: InvestmentPLansRepository
    userRepository: UserRepository

    constructor () {
        this.investMentPlansRepository = new InvestmentPLansRepository()
        this.userRepository = new UserRepository()
    }

    async getAllInvestMentPlanService (payload: JwtPayload) {
        const { id } = payload
        return await this.investMentPlansRepository.getAllInvestmentPlans(id)
    }

    async getInvestMentPlanByIdService (id: number) {
        return await this.investMentPlansRepository.getInvestmentPlanById(id)
    }

    async createInvestMentPlan (newPlan: TInvestment, payload: JwtPayload) {

        const { id } = payload
        const plan = await this.investMentPlansRepository.createInvestMentPlan(newPlan, id)
        if (plan)
        {
            return { meaage: ' new plan created', }
        }
    }
    async updateInvestMentPlan (planInfo: Partial<TInvestment>, payload: JwtPayload) {
        const { id } = payload
        return await this.investMentPlansRepository.updateInvestMentPlan(planInfo, id)
    }

    async deleteInvestMentPlan (id: number) {
        return await this.investMentPlansRepository.deleteInvestmentPlan(id)
    }
}