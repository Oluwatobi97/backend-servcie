import { describe, expect, it } from "vitest";
import { Express } from "express";

import request from 'supertest'

import { App } from "../../app";
import { TUser } from "../../resources/user-resource/types";



const CREATE_ACCOUNT_URL = '/api/v1/auth-system/create-account' as const
const LOGIN_USER_URL = '/api/v1/auth-system/login'



// this can only be used for users
const sendMockRequest = async (app: Express, url: string, mockUserDetails: TUser) => {
    return await request(app).post(url)
        .send(mockUserDetails)
        .set('Accept', 'application/json')
}

// const createMockUser = async (user: TUser) => {
//     const {} =  
//     return {
//         email,
//         password
//     }
// }

const EMAIl_INVALID_OBJECT = [
    {
        validation: 'email',
        code: 'invalid_string',
        message: 'You must enter a valid Email Adress',
        path: [ 'email' ]
    },
    {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: [ 'password' ],
        message: 'Required'
    }
] as const

const PASSWORD_INVALID_OBJECT = [
    {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: [ 'password' ],
        message: 'Required'
    }
]



describe('user actions', () => {
    const { app } = new App()

    describe('/api/v1/auth-system/create-accout', () => {

        const uniqueEmail = `user${ Date.now() }@exapmle.com`

        it('should create a new user account', async () => {

            const mockUserDetails: TUser = {
                email: uniqueEmail,
                password: "password1234"
            }
            const response = await sendMockRequest(app, CREATE_ACCOUNT_URL, mockUserDetails)


            expect(response.statusCode).toBe(201)

            expect(response.body).toMatchObject({
                message: 'account created'
            })

        })

        it('should return validation error when email is invalid', async () => {
            const mockUserDetails: TUser = {
                email: 'user',
                passwrod: 'password123'
            }
            const response = await sendMockRequest(app, CREATE_ACCOUNT_URL, mockUserDetails)
            const message = JSON.parse(response.body.message)

            expect(response.statusCode).toBe(400)
            // work on this more
            expect(message).toMatchObject(
                EMAIl_INVALID_OBJECT
            )
        })

        it('should return validation error when password is invalid', async () => {
            const mockUserDetails: TUser = {
                email: uniqueEmail,
                passwrod: 'password1'
            }
            const response = await sendMockRequest(app, CREATE_ACCOUNT_URL, mockUserDetails)
            const message = JSON.parse(response.body.message)

            expect(response.statusCode).toBe(400)
            // work on this more
            expect(message).toMatchObject(
                PASSWORD_INVALID_OBJECT
            )
        })
        it('it should return a status of 400 when user already exists', async () => {
            const alredExistingEmail = 'user1730553231996@exapmle.com'

            const mockUserDetails: TUser = {
                email: alredExistingEmail,
                password: "password1234"
            }

            const response = await sendMockRequest(app, CREATE_ACCOUNT_URL, mockUserDetails)

            expect(response.statusCode).toBe(500)
            expect(response.body.message).toBe(`duplicate key value violates unique constraint "users_email_unique"`)
        })
    })

    // describe('/api/v1/auth-system/login', async () => {

    //  })

    // Write more tests

})

