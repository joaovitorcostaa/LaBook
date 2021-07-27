import { HashManager } from "../../services/hashManager";
import { user, userData } from "../../model/user";
import { generateToken } from "../../services/authenticator";
import { generateId } from "../../services/idGenerator";
import { UserDataBase } from "../../data/user/UserDataBase";
import { CustomError } from "../errors/CustomError";

export const signupBusiness = async (
   userData: userData
):Promise<string> => {

   if (
      !userData.name ||
      !userData.email ||
      !userData.password
   ) {
      throw new CustomError(400, 'Preencha os campos "name", "email" e "password"')
   }

   const hd = new HashManager

   const cypherPassword = await hd.hash(userData.password)

   const newUser: user = {
      ...userData,
      password: cypherPassword,
      id: generateId()
   }

   const ud = new UserDataBase("labook_users")

   const user = await ud.login(userData.email)

   if(user){
      throw new CustomError(400, "Esse email já foi cadastrado")
   }

   await ud.signUp(newUser)

   const token: string = generateToken({
      id: newUser.id
   })

   return token
}