import z from 'zod'

export type GetPostsInputDTO = {
  token: string
}

export const GetPostsSchema = z.object({
  token: z.string().min(4)
}).transform(data => data as GetPostsInputDTO)
