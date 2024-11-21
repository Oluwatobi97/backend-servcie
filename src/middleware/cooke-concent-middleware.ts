import { NextFunction,Request, Response } from "express";

export const checkConsentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.cookiesAllowed = req.headers['cookie-consent'] === 'true'; 
    // Consent from frontend
    console.log(req.cookiesAllowed)
    next();
};