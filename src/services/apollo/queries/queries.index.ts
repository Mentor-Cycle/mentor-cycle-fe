import {
  GET_AVAILABILITIES,
  GET_EVENTS,
  GET_ME,
  GET_MENTOR_BY_ID,
  GET_SKILLS,
} from "services/apollo/queries/queries";
import {
  GET_AVAILABILITIES_queryResponseSchema,
  GET_AVAILABILITIES_variablesSchema,
  GET_MENTOR_BY_ID_queryResponseSchema,
  GET_MENTOR_BY_ID_variablesSchema,
  GET_ME_queryResponseSchema,
  GET_SKILLS_queryResponseSchema,
  GET_EVENTS_queryResponseSchema,
  GET_EVENTS_variablesSchema,
} from "services/apollo/queries/queries-properties";

export const queriesIndex = {
  GET_ME: {
    schema: GET_ME_queryResponseSchema,
    query: GET_ME,
    variables: null,
  },
  GET_SKILLS: {
    schema: GET_SKILLS_queryResponseSchema,
    query: GET_SKILLS,
    variables: null,
  },
  GET_AVAILABILITIES: {
    schema: GET_AVAILABILITIES_queryResponseSchema,
    query: GET_AVAILABILITIES,
    variables: GET_AVAILABILITIES_variablesSchema,
  },
  GET_MENTOR_BY_ID: {
    schema: GET_MENTOR_BY_ID_queryResponseSchema,
    query: GET_MENTOR_BY_ID,
    variables: GET_MENTOR_BY_ID_variablesSchema,
  },
  GET_EVENTS: {
    schema: GET_EVENTS_queryResponseSchema,
    query: GET_EVENTS,
    variables: GET_EVENTS_variablesSchema,
  },
};
