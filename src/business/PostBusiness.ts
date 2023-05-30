import { PostDatabase } from "../db/PostDatabase";
import { CreatePostInputDTO } from "../dto/createPost.dto";
import { DeletePostInputDTO } from "../dto/deletePost.dto";
import { EditPostInputDTO } from "../dto/editPost.dto";
import { GetPostsInputDTO } from "../dto/getPosts.dto";
import { AppError } from "../error/AppError";
import { generateId } from "../helpers/generatedId";
import { getTokenPayload } from "../helpers/token";

export class PostBusiness {
  constructor (
    private postDatabase: PostDatabase
  ){}

  public createPost = async (input: CreatePostInputDTO) => {
    const { token, content } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }
    
    return await this.postDatabase.createPost({
      id: generateId(),
      creator_id: tokenPayload.userId,
      content
    })
  }

  public deletePost = async (input: DeletePostInputDTO) => {
    const { postId, token } = input

    const tokenPayload = getTokenPayload(token)

    if (tokenPayload == null) {
      throw new AppError(400)
    }
    
    const post = await this.postDatabase.getPostById(postId)
    
    if (!post) {
      throw new AppError(404)
    }
    
    if (post.creator_id !== tokenPayload.userId) {
      throw new AppError(403)
    }

    return await this.postDatabase.deletePost(postId)
  }
  
  public editPost = async (input: EditPostInputDTO) => {
    const {postId, content, token} = input
    
    const tokenPayload = getTokenPayload(token)
    
    if (tokenPayload == null) {
      throw new AppError(400)
    }
    
    const post = await this.postDatabase.getPostById(postId)
    
    if (!post) {
      throw new AppError(404)
    }
    
    if (post.creator_id !== tokenPayload.userId) {
      throw new AppError(403)
    }

    const { created_at, updated_at, ...postRest } = post

    const editedPost = {...postRest, content}

    return await this.postDatabase.editPost(editedPost)
  }

  public getPosts = async (input: GetPostsInputDTO) => {
    const { token } = input
    
    const tokenPayload = getTokenPayload(token)
    
    if (tokenPayload == null) {
      throw new AppError(400, 'Não autorizado')
    }

    return await this.postDatabase.getPosts()
  }
}