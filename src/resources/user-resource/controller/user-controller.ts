import { CookieOptions, NextFunction, request, Request, response, Response } from "express";
import { UserService } from "../services/user-service";
import { TUser } from "../types";
import { error } from "winston";


const cookeiSettings ={
    httpOnly: true,
    secure: process.env.NODE_ENV  === 'production',
    sameSite:'none',
    maxAge: 60 * 60
} as CookieOptions
export class UserController {
    private userService: UserService


    constructor () {
        this.userService = new UserService()
    }


    createUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            const token = await this.userService.createUserService(req.body)
            if(req.cookiesAllowed){

                res.cookie('accessToken', token, cookeiSettings
                ).status(200).json({
                    message: 'account created',
                    status: 201,
                    token:token
                })
            }

            return
        } catch (error)
        {
            next(error)
        }

    }
    logginUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            const token = await this.userService.logginUser(req.body)

            if(req.cookiesAllowed){
                res.cookie('accessToken', token, cookeiSettings
                ).status(200).json({
                    message: 'Login SuccesFull',
                    status: 200,
                    token:token
    
                })
            }
            
          return
        } catch (error)
        {
            next(error)
        }
    }
    getLoggeinUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            const loggedInUser = await this.userService.getLoggedInUser(req.jwtPayload!)
            res.status(200).json(loggedInUser)
            return
        } catch (error)
        {
            next(error)
        }
    }
    logOut = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            res.clearCookie('accessToken').status(200).json({ message: 'logout' })
            return
        } catch (error)
        {
            next(error)
        }
    }

}