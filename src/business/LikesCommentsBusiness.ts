import { CommentsDatabase } from "../db/CommentsDatabase";
import { LikeInputDTO } from "../dto/likePost.dto";
import { AppError } from "../error/AppError";
import { getTokenPayload } from "../helpers/token";
import { LikesCommentsDatabase } from "../db/LikesCommentsDatabase";
import { EditedComment } from "../models/Comments";

export class LikesCommentsBusiness {
  constructor (
    private likesCommentsDatabase: LikesCommentsDatabase,
    private commentsDatabase: CommentsDatabase,
  ){}

  public likeComment = async (input:LikeInputDTO) => {
    const { like, id, token } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }
   
    const comment = await this.commentsDatabase.getCommentById(id)
    
    if (!comment) {
      throw new AppError(404)
    }
    
    if (comment.creator_id === tokenPayload.userId) {
      throw new AppError(403)
    }

    let likedComment = await this.likesCommentsDatabase.getLikedComment(id, tokenPayload.userId)

    if (!likedComment) {
      await this.likesCommentsDatabase.createLikeComment({comment_id: id, user_id: tokenPayload.userId, like})

      let editedComment:EditedComment = {
        id: comment.id,
        content: comment.content,
        creator_id: comment.creator_id,
        post_id: comment.post_id,
        likes: like ? comment.likes + 1 : comment.likes - 1
      }

      await this.commentsDatabase.editComment(editedComment)

      return {message: `comentário ${like ? 'curtido' : 'descurtido'}`}
    }

    if ((likedComment.like && like) || (!(likedComment.like) && !like)) {
      await this.likesCommentsDatabase.deleteLikedComment({comment_id: id, user_id: tokenPayload.userId})

      let editedComment:EditedComment = {
        id: comment.id,
        content: comment.content,
        creator_id: comment.creator_id,
        post_id: comment.post_id,
        likes: like ? comment.likes - 1 : comment.likes + 1
      }

      await this.commentsDatabase.editComment(editedComment)

      return {message: `${like ? 'like' : 'deslike'} removido`}
    }

    if ((likedComment.like && !like) || (!(likedComment.like) && like)) {
      await this.likesCommentsDatabase.editLikedComment({comment_id: id, user_id: tokenPayload.userId, like})

      let editedComment:EditedComment = {
        id: comment.id,
        content: comment.content,
        creator_id: comment.creator_id,
        post_id: comment.post_id,
        likes: like ? comment.likes + 2 : comment.likes - 2
      }

      await this.commentsDatabase.editComment(editedComment)

      return {message: `comentário ${like ? 'curtido' : 'descurtido'}`}
    }

    throw new AppError(500, 'Erro inesperado ao registrar like')
  }
}