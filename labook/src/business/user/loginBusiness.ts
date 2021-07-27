import { HashManager } from "../../services/hashManager"
import { generateToken } from "../../services/authenticator"
import { UserDataBase } from "../../data/user/UserDataBase"
import { CustomError } from "../errors/CustomError"

export const loginBusiness = async (
   email: string,
   password: string
) => {
   if (!email || !password) {
      throw new CustomError(400, "'email' e 'senha' são obrigatórios")
   }

   const ud = new UserDataBase("labook_users")

   const user = await ud.login(email)

   if (user === null) {
      throw new CustomError(400, "Usuário não encontrado ou senha incorreta")
   }

   const hd = new HashManager

   const passwordIsCorrect = await hd.compare(password, user.password)

   if (!passwordIsCorrect) {
      throw new CustomError(400, "Usuário não encontrado ou senha incorreta")
   }

   const token: string = generateToken({
      id: user.id
      })

   return token
}