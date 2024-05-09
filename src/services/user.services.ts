import { prismaClient } from "../lib/db"
import JWT from 'jsonwebtoken'
import { createHmac, randomBytes } from 'node:crypto'

const SECRET = 'abhinand'

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}

export interface GetUserTokenPayload {
    email: string,
    password: string,
}

class UserService {


    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }

    public static async createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password)
        try {

            return await prismaClient.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    salt,
                    password: hashedPassword
                }
            })

        } catch (error) {
            console.log(error)
        }

    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error('user not found');

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);
        if (userHashedPassword !== user.password) {
            throw new Error('Incorrect password')
        }
        const token = JWT.sign({ id: user?.id }, SECRET, { expiresIn: '1h' })
        return token;
    }

    public static decodJWTtoken(token: string) {
        return JWT.verify(token, SECRET)
    }

    public static getUserById(id: string) {
        return prismaClient.user.findUnique({ where: { id } })
    }
}

export default UserService