import * as z from 'zod';


export const loginSchema = z.object({
  email: z.string().min(1, 'this field is required').email('not valid email'),
  password: z.string().min(1, 'this field is required'),

})

export type loginSchemaForm =z.infer<typeof loginSchema>