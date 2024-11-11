import { Router } from "express";
import { InvestMentController } from "./investment-controller";
import { ValidateIncomingData } from "../../middleware/validate-incoming-data";
import { investMentZodSchema } from "./investment-zod-schema";
import { authGaurd } from "../../middleware/authGaurd";

export const investMentRouter = Router()

const investmentController = new InvestMentController()
investMentRouter.post('/create-investment-plan', ValidateIncomingData(investMentZodSchema), authGaurd, investmentController.createInvestMentPlan)
investMentRouter.get('/', authGaurd, investmentController.getAllInvestMentPlan)