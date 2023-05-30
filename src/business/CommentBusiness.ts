import { CommentsDatabase } from "../db/CommentsDatabase";
import { PostDatabase } from "../db/PostDatabase";
import { CreateCommentInputDTO } from "../dto/createComment.dto";
import { CreatePostInputDTO } from "../dto/createPost.dto";
import { DeletePostInputDTO } from "../dto/deletePost.dto";
import { EditPostInputDTO } from "../dto/editPost.dto";
import { GetCommentsInputDTO } from "../dto/getComments.dto";
import { GetPostsInputDTO } from "../dto/getPosts.dto";
import { AppError } from "../error/AppError";
import { generateId } from "../helpers/generatedId";
import { getTokenPayload } from "../helpers/token";
import { EditedPost } from "../models/Posts";

export class CommentBusiness {
  constructor (
    private commentDatabase: CommentsDatabase,
    private postDatabase: PostDatabase
  ){}

  public createComment = async (input: CreateCommentInputDTO) => {
    const { token, content, postId } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }
     
    const post = await this.postDatabase.getPostById(postId)
    
    if (!post) {
      throw new AppError(404)
    }

    const comment = await this.commentDatabase.createComment({
      id: generateId(),
      creator_id: tokenPayload.userId,
      post_id: postId,
      content
    })

    if (!comment) {
      throw new AppError(500, 'Erro inesperado ao criar comentário')
    }

    const { created_at, updated_at, ...postRest } = post

    const editedPost:EditedPost = {...postRest, comments: post.comments + 1}

    await this.postDatabase.editPost(editedPost)
    
    return comment
  }

  public getComments = async (input: GetCommentsInputDTO) => {
    const { token, postId } = input
    
    const tokenPayload = getTokenPayload(token)
    
    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }

    const post = await this.postDatabase.getPostById(postId)
    
    if (!post) {
      throw new AppError(404)
    }
    
    return await this.commentDatabase.getComments(postId)
  }
}