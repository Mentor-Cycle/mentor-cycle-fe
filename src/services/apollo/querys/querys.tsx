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

export const GET_LOGIN_USER_INFO = gql`
  query FindUserLogin {
    me {
      id
      firstName
      lastName
      email
      skills
      jobTitle
      isMentor
      status
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
      photoUrl
      jobTitle
      jobCompany
      biography
      email
      website
      yearsOfExperience
      availability {
        weekDay
        startHour
      }
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
      skills
      id
      firstName
      lastName
      isMentor
      photoUrl
      email
      jobTitle
      isMentor
      availability {
        startHour
        weekDay
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents($learnerId: String, $mentorId: String) {
    findEvents(learnerId: $learnerId, mentorId: $mentorId) {
      id
      mentorId
      meetingLink
      participants {
        user {
          id
          firstName
          lastName
          jobTitle
          isMentor
        }
      }
      startDate
      endDate
      status
      active
    }
  }
`;
