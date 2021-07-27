import { user } from "../../model/user";
import { BaseDataBase } from "../BaseDataBase";

export class UserDataBase extends BaseDataBase {
    private tableName: string;

    constructor(tableName: string){
        super();
        this.tableName = tableName
    }

    signUp = async (user:user) => {
        await BaseDataBase.connection.insert(user).into(this.tableName)
    }

    login = async (email: string) => {
       const result = await BaseDataBase.connection(this.tableName)
       .select("*")
       .where({email})
       
        if(!result[0]){
            return null
        }
            return {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            password: result[0].password
           } 
       
    }
}