import z from 'zod'

export type GetCommentsInputDTO = {
  token: string
  postId: string
}

export const GetCommentSchema = z.object({
  token: z.string().min(4),
  postId: z.string().min(4)
}).transform(data => data as GetCommentsInputDTO)
