import { z } from "zod";
import { availabilitySchema, availabilityAPISchema } from "schemas";

export type IAvailability = z.infer<typeof availabilitySchema>;
export type IAvailabilityAPI = z.infer<typeof availabilityAPISchema>;
