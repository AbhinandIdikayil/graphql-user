import express from "express"
import { expressMiddleware } from '@apollo/server/express4';
import { apolloServer } from "./graphql";

async function init() {
    const app = express()

    const PORT = Number(process.env.PORT) || 8000


    app.use(express.json())


    app.use('/graphql', expressMiddleware(await apolloServer() ))

    app.listen(PORT, () => console.log(`port is runnning  on ${PORT}`))


}

init()