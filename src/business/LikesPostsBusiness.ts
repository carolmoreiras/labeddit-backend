import { LikesPostDatabase } from "../db/LikesPostsDatabase";
import { PostDatabase } from "../db/PostDatabase";
import { LikeInputDTO } from "../dto/likePost.dto";
import { AppError } from "../error/AppError";
import { getTokenPayload } from "../helpers/token";
import { EditedPost } from "../models/Posts";

export class LikesPostBusiness {
  constructor (
    private likesPostDatabase: LikesPostDatabase,
    private postDatabase: PostDatabase
  ){}

  public likePost = async (input:LikeInputDTO) => {
    const { like, id, token } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }
   
    const post = await this.postDatabase.getPostById(id)
    
    if (!post) {
      throw new AppError(404)
    }
    
    if (post.creator_id === tokenPayload.userId) {
      throw new AppError(403)
    }

    let likedPost = await this.likesPostDatabase.getLikedPost(id, tokenPayload.userId)

    if (!likedPost) {
      await this.likesPostDatabase.createLikePost({post_id: id, user_id: tokenPayload.userId, like})

      let editedPost:EditedPost = {
        id: post.id,
        comments: post.comments,
        content: post.content,
        creator_id: post.creator_id,
        likes: like ? post.likes + 1 : post.likes - 1
      }

      await this.postDatabase.editPost(editedPost)

      return {message: `post ${like ? 'curtido' : 'descurtido'}`}
    }

    if ((likedPost.like && like) || (!(likedPost.like) && !like)) {
      await this.likesPostDatabase.deleteLikePost({post_id: id, user_id: tokenPayload.userId})

      let editedPost:EditedPost = {
        id: post.id,
        comments: post.comments,
        content: post.content,
        creator_id: post.creator_id,
        likes: like ? post.likes - 1 : post.likes + 1
      }

      await this.postDatabase.editPost(editedPost)

      return {message: `${like ? 'like' : 'deslike'} removido`}
    }

    if ((likedPost.like && !like) || (!(likedPost.like) && like)) {
      await this.likesPostDatabase.editLikePost({post_id: id, user_id: tokenPayload.userId, like})

      let editedPost:EditedPost = {
        id: post.id,
        comments: post.comments,
        content: post.content,
        creator_id: post.creator_id,
        likes: like ? post.likes + 2 : post.likes - 2
      }

      await this.postDatabase.editPost(editedPost)

      return {message: `post ${like ? 'curtido' : 'descurtido'}`}
    }

    throw new AppError(500, 'Erro inesperado ao registrar like')
  }
}