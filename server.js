"use strict";

import http from "http";
import Redis from "ioredis";
import express from "express";
import Mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { BaseRedisCache } from "apollo-server-cache-redis";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { DemoAPI } from "./datasources/demoApi";
import { resolvers } from "./resolvers";
import { typeDefs } from "./graphqlSchema";

const PORT = 8080;
const HOST = "0.0.0.0";
const REDIS_PORT = 6389;
const REDIS_HOST = "redis";

Mongoose.connect("mongodb://mongo/myappdb", (err) => {
    if (err) throw err;
    console.log("connected to mongo");
});

// Existing App Server
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// Apollo Server
async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            demoAPI: new DemoAPI(),
        }),
        context: ({ req }) => {
        /* 
            //Get the user token from the headers.
            const token = req.headers.authorization || '';
        
            // Try to retrieve a user with the token
            const user = getUser(token);
        
            // Add the user to the context
            return { user };
        */
        },
        cache: new BaseRedisCache({
            client: new Redis(REDIS_PORT, REDIS_HOST),
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });

    await server.start();

    // app.use(server.getMiddleware())
    server.applyMiddleware({ app });

    // app.listen(PORT, HOST);
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Running on http://${HOST}:${PORT}${server.graphqlPath}`);
}

// Start Server
startApolloServer();
