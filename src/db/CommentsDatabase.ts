import { CommentDB, CommentMinimal, EditedComment } from "../models/Comments"
import { EditedPost, PostDB, PostMinimal } from "../models/Posts"
import { connectDB } from "./database"

export class CommentsDatabase {
  private TABLE_COMMENTS = 'comments'

  public async createComment(newComment: CommentMinimal):Promise<CommentDB> {
    const [comment] = await connectDB(this.TABLE_COMMENTS)
      .insert(newComment)
      .returning('*')

    return comment
  } 

  public async editComment(editedComment: EditedComment):Promise<CommentDB> {
    const {id, likes, content } = editedComment
    
    const [comment] = await connectDB(this.TABLE_COMMENTS)
      .update({
        likes,
        content,
        updated_at: new Date().toISOString()
      })
      .where({id})
      .returning('*')

    return comment
  }

  public async getCommentById(commentId: string):Promise<CommentDB> {
    const [comment] = await connectDB(this.TABLE_COMMENTS).where({id: commentId})

    return comment
  }

  public async getComments(postId: string): Promise<CommentDB[]> {
    return await connectDB(this.TABLE_COMMENTS).where({post_id: postId})
  }
}