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
      photoUrl
      jobTitle
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
      github
      yearsOfExperience
      availability {
        weekDay
        startHour
      }
    }
  }
`;

export const GET_AVAILABILITIES = gql`
  query FindAvailabilities($mentorId: String!) {
    findMentorAvailability(mentorId: $mentorId) {
      firstName
      lastName
      availability {
        active
        weekDay
        startHour
        endHour
        startDate
        endDate
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
      id
      firstName
      lastName
      photoUrl
      email
      jobTitle
      isMentor
      skills
      biography
      yearsOfExperience
      country
      description
      github
      state
      availability {
        startHour
        weekDay
      }
    }
  }
`;

export const GET_IS_USER_LOGGED = gql`
  query isLogged {
    isUserLogged
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
          photoUrl
        }
      }
      startDate
      endDate
      status
      active
    }
  }
`;
