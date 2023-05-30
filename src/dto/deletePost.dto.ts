import z from 'zod'

export type DeletePostInputDTO = {
  postId: string
  token: string
}

export const DeletePostSchema = z.object({
  postId: z.string().min(4),
  token: z.string().min(4),
}).transform(data => data as DeletePostInputDTO)
