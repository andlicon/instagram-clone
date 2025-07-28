import { z } from 'zod';
import { Types } from 'mongoose';

export const basicModelDefinition = z.object({
  _id: z.instanceof(Types.ObjectId),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type StringType = 'text' | 'email' | 'phone' | 'password';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`])(?!.*\s).{8,}$/;

interface ZodStringProps {
  type: StringType;
  length?: {
    min: number;
    max: number;
  };
}

export const StringZod = ({ type, length }: ZodStringProps): z.ZodString => {
  return z.string().check((ctx) => {
    const value = ctx.value;
    if (type === 'email' && !value.match(EMAIL_REGEX)) {
      ctx.issues.push({
        code: 'custom',
        message: 'Email inválido',
        input: ctx.value,
      });
    }
    if (type === 'phone' && !value.match(PHONE_REGEX)) {
      ctx.issues.push({
        code: 'custom',
        message: 'Número telefónico inválido',
        input: ctx.value,
      });
    }
    if (type === 'password' && !value.match(PASSWORD_REGEX)) {
      ctx.issues.push({
        code: 'custom',
        message: 'Contraseña inválida',
        input: ctx.value,
      });
    }
    if (length?.min && value.length < length.min) {
      ctx.issues.push({
        code: 'custom',
        message: `El campo debe tener una longitud de ${length.min} carácteres`,
        input: ctx.value,
      });
    }
    if (length?.max && value.length > length.max) {
      ctx.issues.push({
        code: 'custom',
        message: `El campo debe tener una longitud de ${length.max} carácteres`,
        input: ctx.value,
      });
    }
  });
};
