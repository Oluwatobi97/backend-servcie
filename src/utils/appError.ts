

export class AppErr extends Error
{
    statusCode: number
    status: string
    isOperational: boolean

    constructor (message: string, statusCode: number)
    {
        super(message)
        this.statusCode = statusCode
        this.status = `${ statusCode }`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}


export class NotFoundError extends AppErr
{
    constructor (message = 'Not Found')
    {
        super(message, 404)
    }
}

export class BadRequestError extends AppErr
{
    constructor (message = 'Bad Request')
    {
        super(message, 400)
    }
}

export class UnAuthorized extends AppErr
{
    constructor (message = 'UnAuthorized Request')
    {
        super(message, 401)
    }
}