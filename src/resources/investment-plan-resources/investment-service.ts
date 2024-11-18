import { JwtPayload } from "jsonwebtoken";
import { InvestmentPLansRepository } from "./investment-repository";
import { TInvestment } from "./investment-zod-schema";
import { UserRepository } from "../user-resource/repsository/user-repository";
import { BadRequestError } from "../../utils/appError";

export class InvestMentPlanService {
    investMentPlansRepository: InvestmentPLansRepository
    userRepository: UserRepository

    constructor () {
        this.investMentPlansRepository = new InvestmentPLansRepository()
        this.userRepository = new UserRepository()
    }

    private setPlanType = (amount: number) => {
        if (amount < 500) return 'Bronze'
        if (amount >= 500 && amount < 1000) return 'Silver'
        if (amount >= 1000) return 'Gold'
        return 'Bronze'
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
        const planType = this.setPlanType(newPlan.amount)
        await this.investMentPlansRepository.createInvestMentPlan({ ...newPlan, planType: planType, userId: id })
        return { meaage: ' new plan created', }
    }
    async updateInvestMentPlan (planInfo: Partial<TInvestment>, payload: JwtPayload) {
        const { id } = payload
        return await this.investMentPlansRepository.updateInvestMentPlan(planInfo, id)
    }

    async deleteInvestMentPlan (id: number) {
        return await this.investMentPlansRepository.deleteInvestmentPlan(id)
    }
}