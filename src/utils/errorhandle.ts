// class Inte {
//     name = ''
// }

import {NextFunction, Response, Request} from "express";
import {AppErr} from "./appError";

//  A class can be used as an interface because of the new interface you will then have acess to some values
const errorHandler = (error: AppErr, req: Request, res: Response, next: NextFunction) =>
{

    error.status = error.status || 'error'
    error.statusCode = error.statusCode || 500

    res.status(error.statusCode).json({
        message: error.message,
        status: error.status,
        stack: error.stack
    })
    next()

}

export default errorHandler