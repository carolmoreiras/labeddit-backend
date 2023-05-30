import z from 'zod'

export type SigninInputDTO = {
  email: string
  password: string
}

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
}).transform(data => data as SigninInputDTO)
