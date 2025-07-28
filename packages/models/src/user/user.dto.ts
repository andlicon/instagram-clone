import { z } from 'zod';
import { basicModelDefinition } from '../utils';

export const userDefinition = basicModelDefinition.extend({
  username: z.string(),
  email: z.email(),
  password: z.string(),
  name: z.string(),
  phone: z.string(),
  image: z.string(),
});
