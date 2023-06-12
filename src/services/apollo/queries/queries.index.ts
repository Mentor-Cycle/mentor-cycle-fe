import {
  GET_AVAILABILITIES,
  GET_ME,
  GET_SKILLS,
} from "services/apollo/queries/queries";
import {
  GET_AVAILABILITIES_queryResponseSchema,
  GET_AVAILABILITIES_variablesSchema,
} from "services/apollo/queries/queries-properties/GET_AVAILABILITIES";
import { GET_ME_queryResponseSchema } from "services/apollo/queries/queries-properties/GET_ME";
import { GET_SKILLS_queryResponseSchema } from "services/apollo/queries/queries-properties/GET_SKILLS";

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
};
