import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

const Transaction = mongoose.model('Transaction', transactionSchema)
export default Transaction
