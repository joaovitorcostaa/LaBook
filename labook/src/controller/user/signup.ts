import { Request, Response } from "express";
import { signupBusiness } from "../../business/user/signupBusiness";
import { userData } from "../../model/user";

export const signup = async (
   req: Request,
   res: Response
) => {
   try {
      const { name, email, password } = req.body 

      const userData = {name, email, password} as userData

      const token: string = await signupBusiness(userData)

      res
         .status(201)
         .send({
            message: "Usuário criado!",
            token
         })

   } catch (error) {
      res.status(400).send(error.message)
   }
}