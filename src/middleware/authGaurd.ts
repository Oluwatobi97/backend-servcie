import { NextFunction, Request, Response } from "express";
import { decrypt } from "../lib/jwt/jwt-sign";
import { BadRequestError, UnAuthorized } from "../utils/appError";


// TODO AUTHGAURD

import { JwtPayload } from 'jsonwebtoken';
import logger from "../utils/logget";

declare global {
    namespace Express {
        export interface Request {
            jwtPayload?: JwtPayload;
            cookiesAllowed:boolean
        }
    }
}
// TODO WORK ON TYPE ODF COOKIE
const convertToJwtPayload = (token:string, req:Request, next:NextFunction)=>{
    const jwtPayload =  decrypt(token)
    if (jwtPayload)
        {
            req.jwtPayload = jwtPayload
            next()
        } else
        {
    
            next(new UnAuthorized())
        }
   
}

export const authGaurd = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookiesAllowed)
    if(req.cookiesAllowed){
        const cookieToken = req.cookies?.accessToken
        console.log(cookieToken)
        if (!cookieToken) throw new UnAuthorized('un-Authorized')
        convertToJwtPayload(cookieToken, req, next)
    }
    const authorizationToken = req.query?.token as String
    const token = authorizationToken ? authorizationToken.replace(/\\/g, "").slice(1, -1) : null;
    console.log(token)
    convertToJwtPayload(token!, req ,next)
}