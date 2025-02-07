import * as bcrypt from "bcrypt";

export class helpers {

    static async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    };
    
    static async matchPassword(password: string, savedPassword: string) {
        try {

            return await bcrypt.compare(password, savedPassword);
        } catch (e) {
            console.log(e);
        }
    };
}
