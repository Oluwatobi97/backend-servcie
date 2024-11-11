import {NextFunction, request, Request, response, Response} from "express";
import {UserService} from "../services/user-service";
import {TUser} from "../types";

export class UserController
{
    private userService: UserService


    constructor ()
    {
        this.userService = new UserService()
    }


    createUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) =>
    {
        try
        {
            const token = await this.userService.createUserService(req.body)

            res.cookie('acessToken', token).status(201).json({
                message: 'account created'
            })

            next()
        } catch (error)
        {
            next(error)
        }

    }
    logginUser = async (req: Request<{}, {}, TUser>, res: Response, next: NextFunction) =>
    {
        try
        {
            const token = await this.userService.logginUser(req.body)

            res.cookie('acessToken', token).status(200).json({
                message: 'Login SuccesFull'
            })
            next()
        } catch (error)
        {
            next(error)
        }
    }
}