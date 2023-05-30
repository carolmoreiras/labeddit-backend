import bcrypt from 'bcryptjs'
import { enviroments } from "./enviroments"

export const encrypt = async(plainText: string) => {
  const rounds = Number(enviroments.bcryptCost)
  const salt = await bcrypt.genSalt(rounds)
  const hash = await bcrypt.hash(plainText, salt)

  return hash
}

export const compareHash = async (plainText:string, hash: string) => {
  return await bcrypt.compare(plainText, hash)
}