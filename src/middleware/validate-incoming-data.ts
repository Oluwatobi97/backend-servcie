
// this function validates incoming data using zod

import { NextFunction, Response, Request } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../utils/appError";

export const ValidateIncomingData = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.safeParse(req.body)
    if (validatedData.error) throw new BadRequestError(validatedData.error.message)
    next()
}