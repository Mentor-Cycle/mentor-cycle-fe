import { z } from "zod";
import { availabilitySchema } from "schemas";

export type IAvailability = z.infer<typeof availabilitySchema>;
