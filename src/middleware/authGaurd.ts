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
export const authGaurd = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie?.slice(11)
    if (!cookies) throw new UnAuthorized()


    const jwtPayload = decrypt(cookies)

    if (jwtPayload)
    {
        req.jwtPayload = jwtPayload
        next()
    } else
    {

        next(new UnAuthorized())
    }

}