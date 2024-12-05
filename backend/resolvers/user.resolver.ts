import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const userResolver = {
  Query: {
    users: async () => {
      return await User.find()
    },
  },
  Mutation: {
    createUser: async (_, { user }) => {
      return await User.create(user)
    },
  },
}

export default userResolver
