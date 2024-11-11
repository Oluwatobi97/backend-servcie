import express, { Express } from 'express'
import cors from 'cors'
import errorHandler from './utils/errorhandle'
import { userRouter } from './resources/user-resource/routes/user-routes'
import { investMentRouter } from './resources/investment-plan-resources/investment-routes'

// export const app = express()


// app.use(cors({
//     origin: '*'
// }))


// app.use(express.json())
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
            origin: "*"
        }))
        this.app.use(express.json())
        this.app.use('/api/v1/auth-system', userRouter)
        this.app.use('/api/v1/investment', investMentRouter)
        this.app.use(errorHandler)
    }
}
