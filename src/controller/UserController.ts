import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SignupSchema } from "../dto/signup.dto";
import { SigninSchema } from "../dto/signin.dto";
import { catchError } from "../error/catchError";

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ){}

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        allowedContact: req.body.allowedContact
      })

      const output = await this.userBusiness.signup(input)

      res.status(201).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }

  public signin = async(req:Request, res: Response) => {
    try {
      const input = SigninSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.signin(input)

      res.status(200).send(output)
    } catch (error) {
      catchError(res, error)
    }
  }
}