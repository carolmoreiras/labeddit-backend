import jwt, { JwtPayload } from "jsonwebtoken"
import { enviroments } from "./enviroments"

export type TokenPayload = {
  userId: string
  name: string
  role: string
}

export const createToken = (payload: TokenPayload) => {
  const token = jwt.sign(
    payload,
    enviroments.jwt.key,
    { expiresIn: enviroments.jwt.expiration }
  )

  return token
}

export const getTokenPayload = (token:string): TokenPayload | null => {
  try {
    const payload = jwt.verify(token, enviroments.jwt.key) as JwtPayload & TokenPayload

    const dateNow = new Date()
    
    if (payload.exp < dateNow.getTime()/1000) {
      return null
    }

    return payload
  } 
  
  catch (error) {
    return null
  }
}