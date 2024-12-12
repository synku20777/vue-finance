import { gql } from '@apollo/client'

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      id
      username
      name
    }
  }
`

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(id: $userId) {
      id
      name
      username
      # relationships
      transactions {
        id
        description
        category
        amount
        date
      }
    }
  }
`
