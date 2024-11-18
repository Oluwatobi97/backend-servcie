import {zodUserSchema} from "../zod/user-zod-schema";


export type TUser = z.infer<typeof zodUserSchema>

