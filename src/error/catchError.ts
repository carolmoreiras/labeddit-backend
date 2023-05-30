import { Response } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export const catchError = (res: Response, error: Error) => {
  console.log(error)

  if (error instanceof AppError) {
    if (error.message === '') {
      return res.sendStatus(error.statusCode)
    }
    return res.status(error.statusCode).send(error.message)
  }

  if (error instanceof ZodError) {
    return res.status(400).send(error.issues)
  }

  return res.status(500).send("Unexpected server error")
}