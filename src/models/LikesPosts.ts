export type LikedPostDB = {
  post_id: string
  user_id: string
  like: boolean
}

export type DeleteLikedPost = Omit<LikedPostDB, 'like'>