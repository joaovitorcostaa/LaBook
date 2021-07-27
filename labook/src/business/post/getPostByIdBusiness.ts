import { PostDataBase } from "../../data/post/PostDataBase"
import { post } from "../../model/post"
import { CustomError } from "../errors/CustomError";

export const getPostByIdBusiness = async (
   id: string
): Promise<post> => {

   const pd = new PostDataBase("labook_posts")

   const result = await pd.getPostById(id) 

       const date = new Date(result.created_at).toISOString()

       const onlyDate = date.split("T")

        const splittedDate = onlyDate[0].split("-")

        const correctedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

        result.created_at = correctedDate

   if (!result) {
      throw new CustomError(400, "Post não encontrado")
   }
   
   return result
}