import { UserDatabase } from "../db/UserDatabase";
import { SigninInputDTO } from "../dto/signin.dto";
import { SignupInputDTO } from "../dto/signup.dto";
import { AppError } from "../error/AppError";
import { compareHash, encrypt } from "../helpers/encryption";
import { generateId } from "../helpers/generatedId";
import { TokenPayload, createToken } from "../helpers/token";

export class UserBusiness {
  constructor (
    private userDatabase: UserDatabase
  ){}

  public signup = async (input: SignupInputDTO) => {
    const { name, email, password, allowedContact } = input
    
    const userEmailExists = await this.userDatabase.getUserByEmail(email)

    if (userEmailExists.length > 0) {
      throw new AppError(400, 'Usuário já cadastrado')
    }

    const id = generateId()

    const hashedPassword = await encrypt(password)

    const newUser = await this.userDatabase.createUser({
      id,
      name,
      email,
      role: 'NORMAL',
      password: hashedPassword,
      allowed_contact: allowedContact
    })

    const tokenPayload:TokenPayload = {
      userId: newUser.id,
      name: newUser.name,
      role: newUser.role
    }

    const token = createToken(tokenPayload)

    return {
      message: 'Cadastro realizado com sucesso',
      token
    }
  }

  public signin = async (input: SigninInputDTO) => {
    const { email, password } = input
    
    const [user] = await this.userDatabase.getUserByEmail(email)

    if (!user) {
      throw new AppError(400, 'Senha inválida ou usuário não existe')
    }
    
    const comparedHash = await compareHash(password, user.password)
    
    if (!comparedHash) {
      throw new AppError(400, 'Senha inválida ou usuário não existe')
    }

    const token = createToken({
      userId: user.id,
      name: user.name,
      role: user.role
    })

    return {
      token
    }
  }
}