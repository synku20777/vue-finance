import { register } from 'module'
import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { UserMinus } from 'lucide-vue-next'

const userResolver = {
  Mutation: {
    register: async (_, { input }, context) => {
      console.log('Entering register mutation')
      try {
        const { username, name, email, password } = input
        console.log(
          `Input fields: username=${username}, name=${name}, email=${email}, password=${password}`,
        )
        if (!username || !name || !email || !password) {
          console.log('All fields are required')
          throw new Error('All fields are required')
        }
        const userExists = await User.findOne({ username })
        if (userExists) {
          console.log('User already exists')
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
        await context.login(newUser)
        console.log('User logged in successfully')
      } catch (error) {
        console.error(`Error in register mutation: ${error.message}`)
        throw new Error(error)
      }
    },
    login: async (_, { input }, context) => {
      console.log('Entering login mutation')
      try {
        const { email, password } = input
        console.log(`Input fields: email=${email}, password=${password}`)
        const { user } = await context.authenticate('graphql-local', { email, password })
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
        req.session.destroy((err) => {
          if (err) {
            console.error(`Error destroying session: ${err.message}`)
            throw new Error(err)
          }
          console.log('Session destroyed successfully')
        })
        res.clearCookie('connect.sid')
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
        const user = await context.getUser()
        if (user) {
          console.log(`User found: ${user._id}`)
        } else {
          console.log('User not found')
        }
        return user
      } catch (error) {
        console.error(`Error in authUser query: ${error.message}`)
        throw new Error(error)
      }
    },
    user: async (_, { id }) => {
      console.log(`Entering user query for id: ${id}`)
      try {
        const user = await User.findById(id)
        if (user) {
          console.log(`User found: ${user._id}`)
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
      console.log(`Entering transactions resolver for user: ${parent.id}`)
      try {
        const transactions = await Transaction.find({ user: parent.id })
        console.log(`Found ${transactions.length} transactions for user: ${parent.id}`)
        return transactions
      } catch (error) {
        console.error(`Error in transactions resolver: ${error.message}`)
        throw new Error(error)
      }
    },
  },
}

export default userResolver
