import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { GetPostsSchema } from "../dto/getPosts.dto";
import { CreatePostSchema } from "../dto/createPost.dto";
import { EditPostSchema } from "../dto/editPost.dto";
import { DeletePostSchema } from "../dto/deletePost.dto";
import { LikeSchema } from "../dto/likePost.dto";
import { catchError } from "../error/catchError";
import { LikesCommentsBusiness } from "../business/LikesCommentsBusiness";
import { GetCommentSchema } from "../dto/getComments.dto";
import { CreateCommentSchema } from "../dto/createComment.dto";
import { CommentBusiness } from "../business/CommentBusiness";

export class CommentController {
  constructor(
    private commentBusiness: CommentBusiness,
    private likesCommentsBusiness: LikesCommentsBusiness
  ){}

  public getComments = async (req:Request, res:Response) => {
    try {
      const input = GetCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.postId 
      })

      const output = await this.commentBusiness.getComments(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public createComment = async (req:Request, res:Response) => {
    try {
      const input = CreateCommentSchema.parse({
        token: req.headers.authorization,
        postId: req.params.postId,
        content: req.body.content
      })

      const output = await this.commentBusiness.createComment(input)

      res.status(201).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public likeComment = async (req:Request, res:Response) => {
    try {
      const input = LikeSchema.parse({
        id: req.params.commentId,
        token: req.headers.authorization,
        like: req.body.like
      })

      const output = await this.likesCommentsBusiness.likeComment(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

}