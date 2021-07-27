import * as bcrypt from 'bcryptjs';

export class HashManager {
 private cost = Number(process.env.BCRYPT_COST)
 
 async hash (plainText: string): Promise<string> {
   const salt = await bcrypt.genSalt(this.cost)
   return bcrypt.hash(plainText, salt
    )
 }

 async compare (plainText: string, cypherText: string): Promise<boolean> {
   return bcrypt.compare(plainText, cypherText)
 }
} 