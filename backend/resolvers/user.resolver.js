// import { register } from 'module'
import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
// import { UserMinus } from 'lucide-vue-next'

const userResolver = {
  Mutation: {
    register: async (_, { input }, context) => {
      console.log('Entering register mutation')
      try {
        const { username, name, email, password } = input
        console.log(
          `Input fields: username=${username}, email=${email}, name=${name}, password=${password}`,
        )
        if (!username || !name || !password) {
          console.log('All fields are required')
          throw new Error('All fields are required')
        }
        const existingUser = await User.findOne({ username })
        if (existingUser) {
          throw new Error('User already exists')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log('Password hashed successfully')

        const newUser = new User({
          username,
          name,
          email,
          password: hashedPassword,
        })
        await newUser.save()
        console.log(`User created successfully: ${newUser._id}`)
        if (context.login) {
          const plainUser = newUser.toObject()
          console.log('Logging in user:', plainUser)
          await context.login(plainUser) // Convert Mongoose document to plain object
        } else {
          console.warn('context.login is not defined')
        }
        return newUser.toObject() // Convert Mongoose document to plain object
      } catch (error) {
        console.error(`Error in register mutation: ${error.message}`)
        throw new Error(error)
      }
    },
    login: async (_, { input }, context) => {
      console.log('Entering login mutation')
      try {
        const { username, password } = input
        console.log(`Input fields: username=${username}, password=${password}`)
        const { user } = await context.authenticate('graphql-local', { username, password })
        if (!user) {
          console.log('Invalid credentials')
          throw new Error('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          console.log('Invalid credentials')
          throw new Error('Invalid credentials')
        }
        await context.login(user)
        console.log('User logged in successfully')
        return user
      } catch (error) {
        console.error(`Error in login mutation: ${error.message}`)
        throw new Error(error)
      }
    },
    logout: async (_, __, context) => {
      console.log('Entering logout mutation')
      try {
        await context.logout()
        console.log('User logged out successfully')
        context.req.session.destroy((err) => {
          if (err) {
            console.error(`Error destroying session: ${err.message}`)
            throw new Error(err)
          }
          console.log('Session destroyed successfully')
        })
        context.res.clearCookie('connect.sid')
        console.log('Cookie cleared successfully')
        return { message: 'Logged out' }
      } catch (error) {
        console.error(`Error in logout mutation: ${error.message}`)
        throw new Error(error)
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      console.log('Entering authUser query')
      try {
        console.log('Fetching authenticated user')
        const user = await context.getUser() // Ensure this is an async call
        if (!user) {
          console.log('No authenticated user found')
          return null
        }
        console.log(`Authenticated user found: ${user._id}`)
        return user
      } catch (err) {
        console.error('Error in authUser: ', err)
        throw new Error('Failed to fetch authenticated user')
      }
    },
    user: async (_, { id }) => {
      console.log(`Entering user query for id: ${id}`)
      try {
        const user = await User.findById(user.id)
        if (user) {
          console.log(`User found: ${user.id}`)
        } else {
          console.log(`User not found for id: ${id}`)
        }
        return user
      } catch (error) {
        console.error(`Error in user query: ${error.message}`)
        throw new Error(error)
      }
    },
  },
  User: {
    transactions: async (parent) => {
      console.log(`Entering transactions resolver for user: ${parent._id}`)
      try {
        const transactions = await Transaction.find({ user: parent._id })
        console.log(`Found ${transactions.length} transactions for user: ${parent._id}`)
        return transactions
      } catch (error) {
        console.error(`Error in transactions resolver: ${error.message}`)
        throw new Error(error)
      }
    },
  },
}

export default userResolver
