import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      description
      paymentType
      category
      amount
      date
    }
  }
`

export const GET_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    transaction(transactionId: $id) {
      id
      description
      paymentType
      category
      amount
      date
      user {
        name
        username
      }
    }
  }
`

export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`
