import { PostDataBase } from "../../data/post/PostDataBase";
import { postData } from "../../model/post";
import { getTokenData } from "../../services/authenticator";
import { generateId } from "../../services/idGenerator";
import { CustomError } from "../errors/CustomError";

export const createPostBusiness = async (
    postData: postData,
    token: string
) => {

   const author = getTokenData(token)

   if(!author){
      throw new CustomError(403, "Seu token é inválido")
   }

   const author_id = author.id

   const dateArray = postData.created_at.split("/")
   const day = dateArray[0]
   const month = dateArray[1] 
   const year = dateArray[2]

   const correctDate = `${year}-${month}-${day}`

   postData.created_at = correctDate

   if (
      !postData.photo ||
      !postData.description ||
      !postData.created_at ||
      !postData.type
   ) {
      throw new CustomError(400, '"photo", "description", "created_at" e "type" são obrigatórios')
   }

   const id: string = generateId()

   const postWithUserInfo = {id, ...postData, author_id}

   const pd = new PostDataBase("labook_posts")

   await pd.createPost(postWithUserInfo)
}