import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express()

    const PORT = Number() || 8000


    app.use(express.json())

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String):String
            }
        `,
        resolvers: {
            Query : {
                hello:() => 'hello',
                say:(parent, {name}) => name
            }
        },
    })


    await server.start()



    app.use('/graphql', expressMiddleware(server))

    app.listen(PORT, () => console.log(`port is runnning  on ${PORT}`))


}

init()