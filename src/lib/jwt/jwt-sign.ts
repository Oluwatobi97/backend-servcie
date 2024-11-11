
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = 'htjjnjknkjgkdjkd'

export const encrypt = ({ id, email }: { id: number, email: string }) => {
    const encrypted = jwt.sign({ id, email }, JWT_SECRET, { algorithm: "HS256", expiresIn: '10000' })
    return encrypted
}

export const decrypt = (accessToken: string) => {
    const decryptedToken = jwt.decode(accessToken) as JwtPayload | null
    return decryptedToken
}

//  i want to authenticate this users somehow


