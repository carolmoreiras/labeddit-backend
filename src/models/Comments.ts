export type CommentDB = {
  id: string
  creator_id: string
  post_id: string
  content: string
  likes: number
  created_at: string
  updated_at: string
}

export type EditedComment = Omit<CommentDB, 'created_at' | 'updated_at'>

export type CommentMinimal = {
  id: string
  creator_id: string
  post_id: string
  content: string
}