import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const userResolver = {
  Query: {
    users: async () => {
      return await User.find()
    },
    user: async (_, { id }) => {
      return await User.findById(id)
    },
  },
  Mutation: {
    register: async (_, { user }) => {
      return await User.create(user)
    },
  },
}

export default userResolver
