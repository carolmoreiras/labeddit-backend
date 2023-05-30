export type LikedCommentDB = {
  comment_id: string
  user_id: string
  like: boolean
}

export type DeleteLikedComment = Omit<LikedCommentDB, 'like'>