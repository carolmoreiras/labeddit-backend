import { Router } from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../db/UserDatabase'
import { PostController } from '../controller/PostController'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../db/PostDatabase'
import { CommentController } from '../controller/CommentController'
import { CommentBusiness } from '../business/CommentBusiness'
import { LikesPostBusiness } from '../business/LikesPostsBusiness'
import { LikesPostDatabase } from '../db/LikesPostsDatabase'
import { CommentsDatabase } from '../db/CommentsDatabase'
import { LikesCommentsBusiness } from './../business/LikesCommentsBusiness';
import { LikesCommentsDatabase } from './../db/LikesCommentsDatabase';

export const router = Router()

const { signup, signin } = new UserController(
  new UserBusiness(
    new UserDatabase()
  )
)

const postDatabase = new PostDatabase()
const commentsDatabase = new CommentsDatabase()

const { getPosts, createPost, editPost, deletePost, likePost } = new PostController(
  new PostBusiness(postDatabase),
  new LikesPostBusiness(new LikesPostDatabase(),postDatabase)
)

const { getComments, createComment, likeComment } = new CommentController(
  new CommentBusiness(commentsDatabase,postDatabase),
  new LikesCommentsBusiness(new LikesCommentsDatabase(),commentsDatabase)
)

router.post('/signup', signup)
router.post('/signin', signin)

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.put('/posts/:postId/like', likePost)

router.get('/posts/:postId/comments', getComments)
router.post('/posts/:postId/comments', createComment)

router.put('/comments/:commentId/like', likeComment)

router.put('/posts/:postId', editPost)
router.delete('/posts/:postId', deletePost)
