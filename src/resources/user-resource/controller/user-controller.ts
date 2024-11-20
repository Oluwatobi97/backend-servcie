import { NextFunction, request, Request, response, Response } from "express";
import { UserService } from "../services/user-service";
import { TUser } from "../types";
import { error } from "winston";


const cookeiSettings = {

}
export class UserController {
    private userService: UserService


    constructor () {
        this.userService = new UserService()
    }


    createUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            const token = await this.userService.createUserService(req.body)
            console.log(token)

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }
            ).status(200).json({
                message: 'account created',
                status: 201,
                token:token
            })

            next()
        } catch (error)
        {
            next(error)
        }

    }
    logginUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            const token = await this.userService.logginUser(req.body)

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }
            ).status(200).json({
                message: 'Login SuccesFull',
                status: 200,
                token:token

            })
            next()
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
            next()
        } catch (error)
        {
            next(error)
        }
    }
    logOut = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) => {
        try
        {
            res.clearCookie('accessToken').status(200).json({ message: 'logout' })
            next(error)
        } catch (error)
        {
            next(error)
        }
    }

}