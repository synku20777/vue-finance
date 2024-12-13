import { gql } from '@apollo/client/core'

export const SIGN_UP = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      _id
      name
      username
      email
    }
  }
`

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      username
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`
