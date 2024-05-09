import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import {User} from './user'


async function createApolloGraphqlServer() {
    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutation}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutation, 
            }
        },

    })


    await server.start()
    return server
}

export const apolloServer = createApolloGraphqlServer