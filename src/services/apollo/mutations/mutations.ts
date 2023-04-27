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

export const RESET_NEW_PASSWORD = gql`
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

export const CHANGE_PASSWORD = gql`
  mutation changeNewPassword($userId: String!, $newPassword: String!) {
    changePassword(
      changePasswordInput: { userId: $userId, newPassword: $newPassword }
    )
  }
`;

export const USER_UPDATE_DATA = gql`
  mutation userUpdateData(
    $firstName: String
    $lastName: String
    $email: String
    $biography: String
    $jobTitle: String
    $state: String
    $country: String
    $description: String
    $yearsOfExperience: Float
    $id: String!
  ) {
    updateUser(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        id: $id
        biography: $biography
        jobTitle: $jobTitle
        state: $state
        country: $country
        description: $description
        yearsOfExperience: $yearsOfExperience
      }
    ) {
      id
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: String!) {
    deactivateAccount(id: $id)
  }
`;

export const PERSIST_AVAILABILITY = gql`
  mutation persistAvailability($availability: CreateAvailabilityInput!) {
    createAvailability(createAvailabilityInput: $availability) {
      id
    }
  }
`;
