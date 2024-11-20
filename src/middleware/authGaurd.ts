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
        }
    }
}
// TODO WORK ON TYPE ODF COOKIE
const convertToJwtPayload = (token:string)=>{
    return decrypt(token)

   
}

export const authGaurd = (req: Request, res: Response, next: NextFunction) => {
    const cookieToken = req.cookies?.accessToken
    const authorizationToken = req.headers.authorization
    console.log(authorizationToken, 'token')
    if (!cookieToken) throw new UnAuthorized('un-Authorized')
    
        const jwtPayload = decrypt(cookieToken)
        
        if (jwtPayload)
            {
                req.jwtPayload = jwtPayload
                next()
            } else
            {
        
                next(new UnAuthorized())
            }

}