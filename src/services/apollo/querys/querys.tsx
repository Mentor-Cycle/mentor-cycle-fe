import { gql } from "@apollo/client";

export const GET_MENTORS = gql`
  query FindMentors(
    $firstName: String
    $skills: [String!]
    $orderBy: String
    $order: String
    $skip: Float
    $pageSize: Float
    $pageNumber: Float
    $period: String
  ) {
    findMentors(
      findMentorsInput: {
        firstName: $firstName
        skills: $skills
        orderBy: $orderBy
        order: $order
        skip: $skip
        pageSize: $pageSize
        pageNumber: $pageNumber
        period: $period
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

export const GET_MENTOR_BY_ID = gql`
  query FindMentorById($id: String!) {
    findOneMentor(id: $id) {
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
export const GET_SKILLS = gql`
  query FindSkills {
    findAllSkills {
      name
    }
  }
`;
export const GET_ME = gql`
  query {
    me {
      firstName
      isMentor
      photoUrl
      email
      isMentor
    }
  }
`;
