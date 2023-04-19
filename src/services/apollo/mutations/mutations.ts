import { gql } from "@apollo/client";

export const SIGN_IN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    signInUser(userInput: { email: $email, password: $password })
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    signUpUser(userInput: $input)
  }
`;

export const CHANGE_NEW_PASSWORD = gql`
  mutation ResetUserPassword(
    $pin: String!
    $email: String!
    $newPassword: String!
  ) {
    resetUserPassword(
      userInput: { pin: $pin, email: $email, newPassword: $newPassword }
    )
  }
`;

export const SEND_RESET_PASSWORD = gql`
  mutation sendResetPassword($email: String!) {
    sendResetPassword(email: $email)
  }
`;
