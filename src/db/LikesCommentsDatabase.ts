import { DeleteLikedComment, LikedCommentDB } from "../models/LikesComments"
import { connectDB } from "./database"

export class LikesCommentsDatabase {
  private TABLE_COMMENTS = 'likes_comments'

  public async getLikedComment(commentId: string, userId: string): Promise<LikedCommentDB> {
    const [likedComment] = await connectDB(this.TABLE_COMMENTS)
      .where({comment_id: commentId, user_id: userId})

    return likedComment
  }

  public async createLikeComment(likedComment: LikedCommentDB) {
    return await connectDB(this.TABLE_COMMENTS).insert(likedComment)
  }

  public async editLikedComment(likedComment: LikedCommentDB) {
    return await connectDB<LikedCommentDB>(this.TABLE_COMMENTS)
      .update({like: likedComment.like})
      .where({comment_id: likedComment.comment_id, user_id: likedComment.user_id})
  }

  public async deleteLikedComment(deleteLikedComment: DeleteLikedComment)  {
    return await connectDB(this.TABLE_COMMENTS)
      .del()
      .where({
        post_id: deleteLikedComment.comment_id,
        user_id: deleteLikedComment.user_id
      })
  }
}