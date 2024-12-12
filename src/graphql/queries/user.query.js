import gql from 'graphql-tag'

export const AUTH_USER = gql`
  query authUser {
    authUser {
      id
      name
      email
    }
  }
`
