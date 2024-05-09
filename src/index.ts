import express from "express"
import { expressMiddleware } from '@apollo/server/express4';
import { apolloServer } from "./graphql";
import UserService from "./services/user.services";

async function init() {
    const app = express()

    const PORT = Number(process.env.PORT) || 8000


    app.use(express.json())

    // try {
    app.use('/graphql', expressMiddleware(await apolloServer(), {
        context: async ({ req }) => {
            // @ts-ignore
            const token = req.headers["authorization"];
            try {
                const user = await UserService.decodJWTtoken(token as string);
                return { user };
            } catch(error) {
                return {};
            }
        },
    }
    ))
    // } catch (error) {
    //     console.log(error)
    // }


    app.listen(PORT, () => console.log(`port is runnning  on ${PORT}`))


}

init()