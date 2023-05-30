import dotenv from 'dotenv'

dotenv.config()

export const enviroments = {
  port: process.env.PORT,
  dbPath: process.env.DB_PATH,
  jwt: {
    key: process.env.JWT_KEY,
    expiration: process.env.JWT_EXPIRATION
  },
  bcryptCost: process.env.BCRYPT_COST
}