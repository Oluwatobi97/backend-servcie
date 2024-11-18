import { NextFunction, Request, Response } from "express";
import { InvestMentPlanService } from "./investment-service";
import { TInvestment } from "./investment-zod-schema";
import logger from "../../utils/logget";

export class InvestMentController {
    investMentPlanService: InvestMentPlanService

    constructor () {
        this.investMentPlanService = new InvestMentPlanService()
    }

    getAllInvestMentPlan = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            const allInvestMentPlan = await this.investMentPlanService.getAllInvestMentPlanService(req.jwtPayload!)

            res.status(200).json(
                allInvestMentPlan)
            next()

        } catch (error)
        {
            next(error)
        }
    }

    createInvestMentPlan = async (req: Request<{}, {}, TInvestment>, res: Response, next: NextFunction) => {
        try
        {
            const newInvestMentPlan = await this.investMentPlanService.createInvestMentPlan(req.body, req.jwtPayload!)
            res.status(201).json({
                message: newInvestMentPlan?.meaage,
                status: 201
            })
            next()
        } catch (error)
        {
            next(error)
        }
    }
}