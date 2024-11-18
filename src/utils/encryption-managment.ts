import bcrypt from 'bcrypt'

// put this salt into the config files
const SALT_ROUNDS = 10

export const hashPassowrd = async (password: string) =>
{
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
}
export const comparePassowrdWithHashed = async (password: string, hashedPassword: string) =>
{
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}