import UserService, { CreateUserPayload } from "../../services/user.services"

const queries = {
    hello: () => 'hiii',
    getUserToken: async (parent: any, payload: { email: string, password: string }) => {
        const token = await UserService.getUserToken({
            email: payload?.email,
            password: payload?.password
        })
        return token
    }
}
const mutation = {
    createUser: async (parent: any, payload: CreateUserPayload) => {
        const data = await UserService.createUser(payload)
        return data
    }
}


export const resolvers = { queries, mutation }