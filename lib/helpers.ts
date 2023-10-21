import bcryptjs from "bcryptjs";

export class helpers{
    static async encryptPassword(password: string){
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
    
        return hash;
    };
    static async matchPassword(password: string, savedPassword: string){
        try {

            return await bcryptjs.compare(password, savedPassword);
        } catch (e) {
            console.log(e);
        }
    };
}
