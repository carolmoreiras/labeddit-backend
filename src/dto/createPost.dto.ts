import z from 'zod'

export type CreatePostInputDTO = {
  token: string
  content: string
}

export const CreatePostSchema = z.object({
  token: z.string().min(4),
  content: z.string().min(4)
}).transform(data => data as CreatePostInputDTO)
