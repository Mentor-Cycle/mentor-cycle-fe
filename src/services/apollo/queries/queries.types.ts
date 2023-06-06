import { GET_ME_querySchema } from "services/apollo/queries/queries.validation";
import { z } from "zod";

export type IResponse_GET_ME = z.infer<typeof GET_ME_querySchema>;
