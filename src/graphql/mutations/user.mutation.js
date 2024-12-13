import { gql } from '@apollo/client/core'

export const SIGN_UP = gql`
  mutation SignUp($input: RegisterInput!) {
    register(input: $input) {
      id
      username
      name
      email
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
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
