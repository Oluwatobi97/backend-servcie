// import { ZodSchemaChild } from "../../../zod/app-zod-schema";

import { z } from "zod";


// const zodSchema = new ZodSchemaChild(['username', 'password'])

// const zodUserSchema = zodSchema.createZodObject()

// export default zodUserSchema


export const zodUserSchema = z.object({
    email: z.string().email({ message: 'You must enter a valid Email Adress' }),
    password: z.string().min(8, { message: 'must be more than 8 charcters' })
})







