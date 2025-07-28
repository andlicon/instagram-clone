import { z } from 'zod';
import { Types } from 'mongoose';

export const basicModelDefinition = z.object({
  _id: z.instanceof(Types.ObjectId),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
