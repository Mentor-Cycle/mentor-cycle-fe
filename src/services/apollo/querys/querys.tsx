import { gql } from "@apollo/client";

export const GET_MENTORS = gql`
  query FindMentors(
    $firstName: String
    $pageNumber: Float
    $pageSize: Float
    $orderBy: String
    $order: String
  ) {
    findMentors(
      findMentorsInput: {
        firstName: $firstName
        pageNumber: $pageNumber
        pageSize: $pageSize
        orderBy: $orderBy
        order: $order
      }
    ) {
      id
      firstName
      lastName
      skills
      country
      state
      description
    }
  }
`;
