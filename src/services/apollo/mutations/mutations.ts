import { gql } from '@apollo/client'

export const SIGN_IN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    signInUser(userInput: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`
