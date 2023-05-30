export type PostDB = {
  id: string
  creator_id: string
  content: string
  likes: number
  comments: number
  created_at: string
  updated_at: string
}

export type EditedPost = Omit<PostDB, 'created_at' | 'updated_at'>

export type PostMinimal = {
  id: string
  creator_id: string
  content: string
}