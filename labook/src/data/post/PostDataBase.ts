import { post } from "../../model/post";
import { BaseDataBase } from "../BaseDataBase"


export class PostDataBase extends BaseDataBase {
    private tableName: string;

    constructor(tableName: string){
        super();
        this.tableName = tableName
    }

    createPost = async (post: post) => {
        await BaseDataBase.connection(this.tableName)
        .insert({
            id: post.id,
            photo: post.photo,
            description: post.description,
            created_at: post.created_at,
            type: post.type,
            author_id: post.author_id
         })
    }

    getPostById = async (id: string) => {
        const result = await BaseDataBase.connection.raw(`
        SELECT posts.*, name FROM labook_posts AS posts
        JOIN labook_users AS users
        ON author_id = users.id
        WHERE posts.id = "${id}";
    `)

   return result[0][0] 
    }
}