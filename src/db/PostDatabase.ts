import { EditedPost, PostDB, PostMinimal } from "../models/Posts"
import { connectDB } from "./database"

export class PostDatabase {
  public static TABLE_POSTS = 'posts'

  public async editPost(editedPost: EditedPost):Promise<PostDB> {
    const {id, creator_id, comments, likes, content} = editedPost
    
    const [post] = await connectDB(PostDatabase.TABLE_POSTS)
      .update({
        creator_id,
        likes,
        comments,
        content,
        updated_at: new Date().toISOString()
      })
      .where({id})
      .returning('*')

    return post
  }

  public async deletePost(postId: string) {
    return await connectDB(PostDatabase.TABLE_POSTS).del().where({id: postId})
  }

  public async getPostById(postId: string):Promise<PostDB> {
    const [post] = await connectDB(PostDatabase.TABLE_POSTS).where({id: postId})

    return post
  }

  public async createPost(newPost: PostMinimal):Promise<PostDB> {
    const [post] = await connectDB(PostDatabase.TABLE_POSTS)
      .insert(newPost)
      .returning('*')

    return post
  } 

  public async getPosts(): Promise<PostDB[]> {
    return await connectDB(PostDatabase.TABLE_POSTS)
  }
}