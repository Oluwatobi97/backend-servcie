import { Router } from "express";
import { InvestMentController } from "./investment-controller";
import { ValidateIncomingData } from "../../middleware/validate-incoming-data";
import { investMentZodSchema } from "./investment-zod-schema";
import { authGuard } from "../../middleware/authGaurd";

export const investMentRouter = Router()

const investmentController = new InvestMentController()
investMentRouter.use(authGuard)
investMentRouter.post('/create-investment-plan', ValidateIncomingData(investMentZodSchema), authGuard, investmentController.createInvestMentPlan)
investMentRouter.get('/', authGuard, investmentController.getAllInvestMentPlan)