import { gql } from "@apollo/client";

export const SIGN_IN_USER = gql`
  mutation LoginUser(
    $email: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    signInUser(
      userInput: { email: $email, password: $password, rememberMe: $rememberMe }
    )
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($updateEventInput: UpdateEventInput!) {
    updateEvent(updateEventInput: $updateEventInput) {
      id
      status
      mentorId
      endDate
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    signUpUser(userInput: $input)
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    signOutUser
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
