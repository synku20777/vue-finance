import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const transactionResolver = {
  Query: {
    async transactions() {
      return await Transaction.find()
    },
  },
  Mutation: {
    async createTransaction(_, { input }) {
      const transaction = new Transaction(input)
      await transaction.save()
      return transaction
    },
  },
}

export default transactionResolver
