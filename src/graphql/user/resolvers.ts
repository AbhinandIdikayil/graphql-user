import UserService, { CreateUserPayload } from "../../services/user.services"

const queries = {
    hello: () => 'hiii',
    returning: () => 'hai how are you',
    getUserToken: async (parent: any, payload: { email: string, password: string }) => {
        const token = await UserService.getUserToken({
            email: payload?.email,
            password: payload?.password
        })
        return token
    },
    getCurrentLoggedInUser: async (parent: any, parameters: any, context: any) => {
        if(context && context.user){
            const id = context?.user?.id
            const user = await UserService.getUserById(id);
            return user
        }
        throw new Error('who are you')
    }
}
const mutation = {
    createUser: async (parent: any, payload: CreateUserPayload) => {
        const data = await UserService.createUser(payload)
        return data
    }
}


export const resolvers = { queries, mutation }