import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      id
      description
      category
      amount
      date
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransaction!) {
    updateTransaction(input: $input) {
      id
      description
      category
      amount
      date
    }
  }
`
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      id
      description
      category
      amount
      date
    }
  }
`
