import Transaction from '../models/transaction.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      console.log('Entering transactions query')
      try {
        if (!context.getUser()) {
          console.log('User is not authorized')
          throw new Error('Unauthorized')
        }
        const userId = await context.getUser().id
        console.log(`Fetching transactions for userId: ${userId}`)
        const transactions = await Transaction.find({ userId })
        console.log(`Found ${transactions.length} transactions`)
        return transactions
      } catch (error) {
        console.error(`Error in transactions query: ${error.message}`)
        throw new Error(error)
      }
    },
    transaction: async (_, { transactionId }) => {
      console.log(`Entering transaction query for transactionId: ${transactionId}`)
      try {
        const transaction = await Transaction.findById(transactionId)
        if (transaction) {
          console.log(`Found transaction: ${transaction._id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${transactionId}`)
        }
        return transaction
      } catch (error) {
        console.error(`Error in transaction query: ${error.message}`)
        throw new Error(error)
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      console.log('Entering createTransaction mutation')
      try {
        const newTransaction = new Transaction({ ...input, userId: context.getUser().id })
        console.log(`Creating new transaction: ${newTransaction}`)
        await newTransaction.save()
        console.log(`Transaction created successfully: ${newTransaction._id}`)
        return newTransaction
      } catch (error) {
        console.error(`Error in createTransaction mutation: ${error.message}`)
        throw new Error(error)
      }
    },
    updateTransaction: async (_, { input }) => {
      console.log(`Entering updateTransaction mutation for transactionId: ${input.transactionId}`)
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        })
        if (updatedTransaction) {
          console.log(`Transaction updated successfully: ${updatedTransaction._id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${input.transactionId}`)
        }
        return updatedTransaction
      } catch (error) {
        console.error(`Error in updateTransaction mutation: ${error.message}`)
        throw new Error(error)
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      console.log(`Entering deleteTransaction mutation for transactionId: ${transactionId}`)
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
        if (deletedTransaction) {
          console.log(`Transaction deleted successfully: ${deletedTransaction._id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${transactionId}`)
        }
        return deletedTransaction
      } catch (error) {
        console.error(`Error in deleteTransaction mutation: ${error.message}`)
        throw new Error(error)
      }
    },
  },
}

export default transactionResolver
