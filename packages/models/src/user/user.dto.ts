import { z } from 'zod';
import { basicModelDefinition, StringZod } from '../utils';

export const userDefinition = basicModelDefinition.extend({
  username: StringZod({ type: 'text', length: { min: 4, max: 20 } }),
  email: StringZod({ type: 'email' }),
  password: StringZod({ type: 'password', length: { min: 8, max: 20 } }),
  name: StringZod({ type: 'text' }),
  phone: StringZod({ type: 'phone' }),
  image: z.string(),
});
export type IUser = z.infer<typeof userDefinition>;
