import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error('Unauthorized')
        const userId = await context.getUser().id
        const transactions = await Transaction.find({ userId })
        return transactions
      } catch (error) {
        throw new Error(error)
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId)
        return transaction
      } catch (error) {
        throw new Error(error)
      }
    },
    Mutation: {
      async createTransaction(_, { input }, context) {
        try {
          const newTransaction = new Transaction({ ...input, userId: context.getUser().id })
          await newTransaction.save()
          return newTransaction
        } catch (error) {
          throw new Error(error)
        }
      },
      updateTransaction: async (_, { input }) => {
        try {
          const updatedTransaction = await Transaction.findByIdAndUpdate(
            input.transactionId,
            input,
            {
              new: true,
            },
          )
          return updatedTransaction
        } catch (error) {
          throw new Error(error)
        }
      },
      deleteTransaction: async (_, { transactionId }) => {
        try {
          const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
          return deletedTransaction
        } catch (error) {
          throw new Error(error)
        }
      },
    },
  },
}

export default transactionResolver
