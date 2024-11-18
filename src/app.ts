import express, { Express } from 'express'
import cors from 'cors'
import errorHandler from './utils/errorhandle'
import { userRouter } from './resources/user-resource/routes/user-routes'
import { investMentRouter } from './resources/investment-plan-resources/investment-routes'
import cookieParser from 'cookie-parser'

export const app = express()





// app.use(cookieParser())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
// app.use(express.json())
// // app.use('/api/v1/auth-system', userRouter)
// // app.use('/api/v1/investment', investMentRouter)
// app.use(errorHandler)

export class App {
    app: Express

    constructor () {
        this.app = express()
        this.middleWares()
    }

    // look for a better way to do this
    private middleWares = () => {
        this.app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
        }))
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.app.use('/api/v1/auth-system', userRouter)
        this.app.use('/api/v1/investment', investMentRouter)
        this.app.use(errorHandler)
    }
}
