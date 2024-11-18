import { NextFunction, Request, Response } from "express";
import { decrypt } from "../lib/jwt/jwt-sign";
import { BadRequestError, UnAuthorized } from "../utils/appError";


// TODO AUTHGAURD

import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        export interface Request {
            jwtPayload?: JwtPayload;
        }
    }
}
// TODO WORK ON TYPE ODF COOKIE
export const authGaurd = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
    if (!token) throw new UnAuthorized('un Authorized')

    const jwtPayload = decrypt(token)

    if (jwtPayload)
    {
        req.jwtPayload = jwtPayload
        next()
    } else
    {

        next(new UnAuthorized())
    }

}