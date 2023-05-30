import { UserDB, UserMinimal } from "../models/Users"
import { connectDB } from "./database"

export class UserDatabase {
  public static TABLE_USERS = 'users'

  public async getAll(): Promise<UserDB[]> {
    return await connectDB(UserDatabase.TABLE_USERS)
  }

  public async getUserByName(name: string): Promise<UserDB[]> {
    return await connectDB(UserDatabase.TABLE_USERS)
      .where('name', 'LIKE', `%${name}%`)
  }

  public async getUserById(id: string): Promise<UserDB[]> {
    return await connectDB(UserDatabase.TABLE_USERS).where({id})
  }

  public async getUserByEmail(email: string): Promise<UserDB[]> {
    return await connectDB(UserDatabase.TABLE_USERS).where({email})
  }

  public async createUser(newUser: UserMinimal): Promise<UserDB> {
    const [user] = await connectDB(UserDatabase.TABLE_USERS)
      .insert(newUser)
      .returning('*')

    return user
  }
}