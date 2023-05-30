import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { GetPostsSchema } from "../dto/getPosts.dto";
import { CreatePostSchema } from "../dto/createPost.dto";
import { EditPostSchema } from "../dto/editPost.dto";
import { DeletePostSchema } from "../dto/deletePost.dto";
import { LikeSchema } from "../dto/likePost.dto";
import { catchError } from "../error/catchError";
import { LikesPostBusiness } from "../business/LikesPostsBusiness";

export class PostController {
  constructor(
    private postBusiness: PostBusiness,
    private likesPostsBusiness: LikesPostBusiness
  ){}

  public getPosts = async (req:Request, res:Response) => {
    try {
      const input = GetPostsSchema.parse({token: req.headers.authorization})

      const output = await this.postBusiness.getPosts(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public createPost = async (req:Request, res:Response) => {
    try {
      const input = CreatePostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content
      })

      const output = await this.postBusiness.createPost(input)

      res.status(201).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public editPost = async (req:Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        postId: req.params.postId,
        token: req.headers.authorization,
        content: req.body.content
      })

      const output = await this.postBusiness.editPost(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public likePost = async (req:Request, res:Response) => {
    try {
      const input = LikeSchema.parse({
        id: req.params.postId,
        token: req.headers.authorization,
        like: req.body.like
      })

      const output = await this.likesPostsBusiness.likePost(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public deletePost = async (req:Request, res:Response) => {
    try {
      const input = DeletePostSchema.parse({
        postId: req.params.postId,
        token: req.headers.authorization
      })

      await this.postBusiness.deletePost(input)

      res.status(200).send({success: true})
    } catch (error) {
      catchError(res, error)
    }
  }
}