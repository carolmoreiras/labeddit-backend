import { DeleteLikedPost, LikedPostDB } from "../models/LikesPosts"
import { connectDB } from "./database"

export class LikesPostDatabase {
  public static TABLE_LIKES = 'likes_posts'

  public async getLikedPost(postId: string, userId: string): Promise<LikedPostDB> {
    const [likedPost] = await connectDB(LikesPostDatabase.TABLE_LIKES)
      .where({post_id: postId, user_id: userId})

    return likedPost
  }

  public async createLikePost(likedPost: LikedPostDB) {
    return await connectDB(LikesPostDatabase.TABLE_LIKES).insert(likedPost)
  }

  public async editLikePost(likedPost: LikedPostDB) {
    return await connectDB(LikesPostDatabase.TABLE_LIKES)
      .update({like: likedPost.like})
      .where({post_id: likedPost.post_id, user_id: likedPost.user_id})
  }

  public async deleteLikePost(deleteLikedPost: DeleteLikedPost)  {
    return await connectDB(LikesPostDatabase.TABLE_LIKES)
      .del()
      .where({
        post_id: deleteLikedPost.post_id,
        user_id: deleteLikedPost.user_id
      })
  }
}