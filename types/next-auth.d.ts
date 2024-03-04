import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type isAdmin = boolean

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    isAdmin: isAdmin
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      isAdmin: isAdmin
    }
  }
}
