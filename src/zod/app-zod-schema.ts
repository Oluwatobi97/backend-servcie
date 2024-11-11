import { z, ZodObject } from "zod"


const constructMessage = (messageLabel: string, length?: number, message?: string) => {
    if (length && message) return `${message} ${length}`
    if (!length && message) return message
    if (!length && !message) return `a valid ${messageLabel} is required`
    if (length && !message) return `${messageLabel} must not be less than ${length}`
}

// i want the function to create zodObjects according to the keys provided at the instanstiation of the class
// i want this class to return a newly created zodObject
// i want according to the parameters

//  on way to do this is to Infer the type from the schema its self then use genericTypes so that the types would be dynamically inserted along with the parameters
// or creat a static type the use all the values
// i want it to return the schemas on initialization of the class



export class ZodSchemaPrint<T extends string> {
    private keys: T[]

    constructor(keys: T[]) {
        this.keys = keys
        this.createZodObject()
    }

    private loopThroughKeysCreationOfObject() {
        const key = this.keys.map((key) => {
            return this.setZodValues(key)
        })
        return JSON.stringify(key)
    }

    private createSchemaObject(key: string, min = 3) {
        return {
            [key]: z.string().min(min, { message: constructMessage(key, min) })
        }
    }

    private setZodValues(key: string) {
        switch (key) {
            case 'number':
                return this.createSchemaObject(key)
            case 'password':
                return this.createSchemaObject(key, 8)
            case 'email':
                return {
                    [key]: z.string().email({ message: constructMessage('email') }).min(3, { message: constructMessage(key, 8) })
                }
            default:
                return this.createSchemaObject(key)

        }
    }


    createZodObject() {
        const objectToCreate = JSON.parse(this.loopThroughKeysCreationOfObject())
        return ZodObject.create(objectToCreate)
    }
}

export class ZodSchemaChild<T extends string> extends ZodSchemaPrint<T> {

    constructor(keys: T[]) {
        super(keys)
    }
}