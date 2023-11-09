import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../repositories/AdminRepository";
import { Admin } from "../entities/Admin";
import { AppDataSource } from "../index"
import { RolesEnum } from "../entities/RolesEnum";
import * as bcrypt from "bcrypt";

interface IAdminCreate {
    id?: number;
    firstName: string;
    lastName: string;
    age: string;
    phoneNumber: string;
    email: string;
    address: string;
    birthDate: string;
    dni: string;
    userName: string;
    password: string;
    profilePhotoUrl: string;
}

class AdminService {

    adminRepository = AppDataSource.getRepository(Admin)

    async create({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl }: IAdminCreate) {
        if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName || !password || !profilePhotoUrl) {
            throw new Error("Por favor complete todos los datos.");
        }

        //generar salt para hashing de password
        const saltRounds = 10;

        //hasheamos el password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const adminAlreadyExists = await this.adminRepository.findOne({ where: { dni: dni } });

        if (adminAlreadyExists) {
            throw new Error("Admin ya existe.");
        }

        const emailAlreadyExists = await this.adminRepository.findOne({ where: { email: email } });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe.");
        }

        const adm = new Admin(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, hashedPassword, RolesEnum.ADMIN, profilePhotoUrl)

        await this.adminRepository.save(adm);


        return adm;
    }


    async delete(id: number) {

        const admin = await this.adminRepository
            .createQueryBuilder()
            .delete()
            .from(Admin)
            .where("id = :id", { id })
            .execute();

        if (admin.affected === 0) {
            throw new Error(`No se encontró ningún registro con el ID ${id}`);
        }
        console.log(admin)
        return admin;
    }

    async getData(id: number) {
        const admin = await this.adminRepository.findOne({ where: { id: id } });
        return admin;

    }

    async getDataByUsername(username: string) {
        const admin = await this.adminRepository.findOne({ where: { userName: username } });
        return admin;

    }

    async list() {
        const admins = await this.adminRepository.find();
        return admins;

    }

    async search(searchParams: {
        firstName?: string,
        lastName?: string,
        age?: string,
        dni?: string,
        email?: string,
        userName?: string,
        password?: string;
        phoneNumber?: string,
        address?: string
    }) {
        if (!Object.values(searchParams).some(param => param !== undefined)) {
            throw new Error("Por favor rellene al menos un campo de búsqueda");
        }

        const admin = await this.adminRepository
            .createQueryBuilder()
            .where("firstName like :firstName", { firstName: `%${searchParams.firstName}%` })
            .orWhere("lastName like :lastName", { lastName: `%${searchParams.lastName}%` })
            .orWhere("dni like :dni", { dni: `%${searchParams.dni}%` })
            .orWhere("age like :age", { age: `%${searchParams.age}%` })
            .orWhere("email like :email", { email: `%${searchParams.email}%` })
            .orWhere("userName like :userName", { userName: `%${searchParams.userName}%` })
            // .orWhere("password like :password", { password: `%${searchParams.password}%` })
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        console.log("admin: " + admin);
        return admin;
    }

    async update({ id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl }: IAdminCreate) {

        //generar salt para hashing de password
        const saltRounds = 10;
        //hasheamos el password
        password = await bcrypt.hash(password, saltRounds);

        const admin = await this.adminRepository
            .createQueryBuilder()
            .update(Admin)
            .set({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl })
            .where("id = :id", { id })
            .execute();
        if (admin.affected === 0) {
            throw new Error("No se encontro admin")
        }

    }

    async getAdminLogin(email: string, reqPassword: string) {

        const admin = await this.adminRepository.findOne({ where: { email: email } });
//      probamos con bcrypt
        // console.log(admin.firstName)
        // const password = admin.dni.toString()
        // if (reqPassword != password) {
        //     throw new Error("Constraseña incorrecta")
        // }

        if (!admin) {
            throw new Error("no se encontró ese correo");
        }
    
        const storedPassword = admin.password; // este es el password hasheado en DB
    
        // comparamos con el password ingresado por front
        const passwordMatch = await bcrypt.compare(reqPassword, storedPassword);
    
        if (!passwordMatch) {
            throw new Error("contraseña incorrecta");
        }

        return admin;
    }

}

export { AdminService };
export const adminService = new AdminService();
