import express from 'express'
import http from 'http'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongodb-session'
import { buildContext } from 'graphql-passport'
import passportConfig from './passport/passport.config.js'
import bcrypt from 'bcryptjs'

import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from '@apollo/server/standalone'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import mergedTypeDefs from './typeDefs/index.js'
import mergedResolvers from './resolvers/index.js'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import { connectDB } from './db/connectDB.js'

dotenv.config()
const app = express()
const httpServer = http.createServer(app)

const MongoDBStore = connectMongo(session)
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
})

store.on('error', function (error) {
  console.log(error)
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
    },
    store: store,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// const { url } = await startStandaloneServer(server)
await server.start()

app.use(
  '/',
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return buildContext({ req, res })
    },
  }),
)

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
await connectDB()

console.log(`🚀 Server ready at http://localhost:4000/`)
