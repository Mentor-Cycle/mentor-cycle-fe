import { gql } from "@apollo/client";

export const REQUEST_USER = gql`
  query {
    me {
      firstName
      isMentor
      photoUrl
      email
      password
    }
  }
`;
