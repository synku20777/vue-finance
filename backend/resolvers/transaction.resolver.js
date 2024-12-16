import Transaction from '../models/transaction.model.js'

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      console.log('Entering transactions query')
      try {
        if (!context.getUser()) {
          console.log('User is not authorized')
          throw new Error('Unauthorized')
        }
        const userId = await context.getUser()._id
        console.log(`Fetching transactions for userId: ${userId}`)
        const transactions = await Transaction.find({ userId })
        console.log(`Found ${transactions.length} transactions`)
        return transactions
      } catch (error) {
        console.error(`Error in transactions query: ${error.message}`)
        throw new Error(error.message)
      }
    },
    transaction: async (_, { transactionId }) => {
      console.log(`Entering transaction query for transactionId: ${transactionId}`)
      try {
        const transaction = await Transaction.findById(transactionId)
        if (transaction) {
          console.log(`Found transaction: ${transaction.id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${transactionId}`)
        }
        return transaction
      } catch (error) {
        console.error(`Error in transaction query: ${error.message}`)
        throw new Error(error.message)
      }
    },
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error('Unauthorized')

      const userId = context.getUser()._id
      const transactions = await Transaction.find({ userId })
      const categoryMap = {}

      // const transactions = [
      // 	{ category: "expense", amount: 50 },
      // 	{ category: "expense", amount: 75 },
      // 	{ category: "investment", amount: 100 },
      // 	{ category: "saving", amount: 30 },
      // 	{ category: "saving", amount: 20 }
      // ];

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0
        }
        categoryMap[transaction.category] += transaction.amount
      })

      // categoryMap = { expense: 125, investment: 100, saving: 50 }

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }))
      // return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      console.log('Entering createTransaction mutation')
      try {
        const newTransaction = new Transaction({ ...input, userId: context.getUser()._id })
        console.log(`Creating new transaction: ${newTransaction}`)
        await newTransaction.save()
        console.log(`Transaction created successfully: ${newTransaction.id}`)
        return newTransaction
      } catch (error) {
        console.error(`Error in createTransaction mutation: ${error.message}`)
        throw new Error(error.message)
      }
    },
    updateTransaction: async (_, { input }) => {
      console.log(`Entering updateTransaction mutation for transactionId: ${input.transactionId}`)
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
          new: true,
        })
        if (updatedTransaction) {
          console.log(`Transaction updated successfully: ${updatedTransaction.id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${input.transactionId}`)
        }
        return updatedTransaction
      } catch (error) {
        console.error(`Error in updateTransaction mutation: ${error.message}`)
        throw new Error(error.message)
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      console.log(`Entering deleteTransaction mutation for transactionId: ${transactionId}`)
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
        if (deletedTransaction) {
          console.log(`Transaction deleted successfully: ${deletedTransaction.id}`)
        } else {
          console.log(`Transaction not found for transactionId: ${transactionId}`)
        }
        return deletedTransaction
      } catch (error) {
        console.error(`Error in deleteTransaction mutation: ${error.message}`)
        throw new Error(error.message)
      }
    },
  },
}

export default transactionResolver
