import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation SignUp($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      username
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
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
