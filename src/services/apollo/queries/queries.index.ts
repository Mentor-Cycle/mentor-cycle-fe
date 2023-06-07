import { GET_ME } from "services/apollo/queries/queries";
import { GET_ME_querySchema } from "services/apollo/queries/queries.validation";

export const queriesIndex = {
  GET_ME: {
    schema: GET_ME_querySchema,
    query: GET_ME,
  },
};
