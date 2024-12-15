import express from 'express'
import http from 'http'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import connectMongo from 'connect-mongodb-session'
import { buildContext } from 'graphql-passport'
import configurePassport from './passport/passport.config.js'

import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from '@apollo/server/standalone'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import mergedTypeDefs from './typeDefs/index.js'
import mergedResolvers from './resolvers/index.js'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'

dotenv.config()
const app = express()
const httpServer = http.createServer(app)

app.use(
  cors({
    origin: 'http://localhost:5173', // Ensure this matches the client URL
    credentials: true,
  }),
)

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
  }),
)

app.use(passport.initialize())
app.use(passport.session())

configurePassport()

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// const { url } = await startStandaloneServer(server)
await server.start()

app.use(
  '/graphql',
  cors({
    origin: 'http://localhost:5173', // Ensure this matches the client URL
    credentials: 'include',
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      console.log('Setting up context')
      console.log('Session ID:', req.sessionID)
      console.log('User in session:', req.user)
      return {
        ...buildContext({ req, res }),
        getUser: () => req.user, // Ensure getUser function is available in context
      }
    },
  }),
)

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
await connectDB()

console.log(`🚀 Server ready at http://localhost:4000/graphql`)
