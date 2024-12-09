import { register } from 'module'
import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { UserMinus } from 'lucide-vue-next'

const userResolver = {
  Mutation: {
    register: async (_, { input }, context) => {
      try {
        const { username, name, email, password } = input
        if (!username || !name || !email || !password) {
          throw new Error('All fields are required')
        }
        const userExists = await user.findOne({ username })
        if (userExists) {
          throw new Error('User already exists')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
          username,
          name,
          email,
          password: hashedPassword,
        })
        await newUser.save()
        await context.login(newUser)
      } catch (error) {
        throw new Error(error)
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { email, password } = input
        const { user } = await context.authenticate('graphql-local', { email, password })
        if (!user) {
          throw new Error('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }
        await context.login(user)
        return user
      } catch (error) {
        throw new Error(error)
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout()
        req.session.destroy((err) => {
          if (err) {
            throw new Error(err)
          }
        })
        res.clearCookie('connect.sid')
        return { message: 'Logged out' }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser()
        return user
      } catch (error) {
        throw new Error(error)
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id)
        return user
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  User: {
    transactions: async (parent) => {
      try {
        const transactions = await Transaction.find({ user: parent.id })
        return transactions
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}

export default userResolver
