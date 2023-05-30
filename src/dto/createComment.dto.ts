import z from 'zod'

export type CreateCommentInputDTO = {
  token: string
  postId: string
  content: string
}

export const CreateCommentSchema = z.object({
  token: z.string().min(4),
  postId: z.string().min(4),
  content: z.string().min(4)
}).transform(data => data as CreateCommentInputDTO)
