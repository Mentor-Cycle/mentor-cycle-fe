import { GET_ME, GET_SKILLS } from "services/apollo/queries/queries";
import {
  GET_ME_querySchema,
  GET_SKILLS_querySchema,
} from "services/apollo/queries/queries.validation";

export const queriesIndex = {
  GET_ME: {
    schema: GET_ME_querySchema,
    query: GET_ME,
  },
  GET_SKILLS: {
    schema: GET_SKILLS_querySchema,
    query: GET_SKILLS,
  },
};
