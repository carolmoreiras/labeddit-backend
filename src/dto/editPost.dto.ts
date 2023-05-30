import z from 'zod'

export type EditPostInputDTO = {
  postId: string
  token: string
  content: string
}

export const EditPostSchema = z.object({
  postId: z.string().min(4),
  token: z.string().min(4),
  content: z.string().min(4)
}).transform(data => data as EditPostInputDTO)
