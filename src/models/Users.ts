export type UserRole = 'NORMAL' | 'ADMIN'

export type UserDB = {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  allowed_contact: boolean
  created_at: string
}

export type UserModel = {
  id: string
  name: string
  email: string
  role: UserRole
  allowedContact: boolean
  createdAt: string
}

export type UserMinimal = {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  allowed_contact: boolean
}

export class User {
  constructor(private user: {
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: string,
    allowedContact: boolean
  }) {}

  public getName() {
    return this.user.name
  }

  public toDBModel(): UserDB {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      created_at: this.user.createdAt,
      allowed_contact: this.user.allowedContact
    }
  }
  
  public toBusinessModel(): UserModel {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
      createdAt: this.user.createdAt,
      allowedContact: this.user.allowedContact
    }
  }
}