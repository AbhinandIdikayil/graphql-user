const queries = {
    hello:() =>  'hiii'
}
const mutation = {
    createUser:(parent:any,{firstName, lastName, email,}:{firstName:String , lastName:String, email:String}) => {
        return {lastName, firstName, email}
    }
}


export const resolvers = { queries, mutation }