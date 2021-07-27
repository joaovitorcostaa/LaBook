import { Request, Response } from "express";
import { CustomError } from "../../business/errors/CustomError";
import { createPostBusiness } from "../../business/post/createPostBusiness";
import { postData } from "../../model/post";

export const createPost = async (
   req: Request,
   res: Response
) => {
   try {

      const { photo, description, created_at, type } = req.body

      const token  = req.headers.authorization as string

      if(!token){
         throw new CustomError(403, "Você precisa de um token")
      }

      const postData = { photo, description, created_at, type } as postData

      await createPostBusiness(postData, token)

      res.status(201).send("Sucesso!")

   } catch (error) {
      res.status(500).send(error.message)
   }
}