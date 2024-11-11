import { z } from "zod";
import { UserRepository } from "../repsository/user-repository";
import { zodUserSchema } from "../zod/user-zod-schema";
import { BadRequestError, UnAuthorized } from "../../../utils/appError";
import { encrypt } from "../../../lib/jwt/jwt-sign";
import { TUser } from "../types";

export class UserService {
    private userRepository: UserRepository

    constructor () {
        this.userRepository = new UserRepository()
    }



    generatedAccessToken = async ({ id, email }: { id: number, email: string }) => {
        const accessToken = encrypt({ id, email })
        return accessToken
    }

    createUserService = async (userDetails: TUser) => {

        // const hashedPassword = await hashPassowrd(validatedData.data.password)

        const newUser = await this.userRepository.creatUser(userDetails)
        const { email, id } = newUser[ 0 ]

        return this.generatedAccessToken({ id, email })
    }

    logginUser = async (userDetails: TUser) => {
        const userFound = await this.userRepository.findUserByEmail(userDetails.email)
        if (!userFound[ 0 ]) throw new UnAuthorized('Invalid username or password')

        const { email, id, password } = userFound[ 0 ]

        // confirmPassword
        if (password === userDetails.password)
        {
            return this.generatedAccessToken({ id, email })
        }

        throw new UnAuthorized('Invalid username or password')
    }
}