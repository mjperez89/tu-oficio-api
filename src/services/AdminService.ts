import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../repositories/AdminRepository";
import { Admin } from "../entities/Admin";
import { AppDataSource } from "../index"
import { RolesEnum } from "../entities/RolesEnum";
import { error } from "console";

interface IAdminCreate {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: number;
    email: string;
    address: string;
    birthDate: Date;
    dni: number;
    userName: string;

}

class AdminService {

    adminRepository = AppDataSource.getRepository(Admin)

    async create({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName }: IAdminCreate) {
        if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName) {
            throw new Error("Por favor complete todos los datos.");
        }


        const adminAlreadyExists = await this.adminRepository.findOne({ where: { dni: dni } });

        if (adminAlreadyExists) {
            throw new Error("Admin ya existe.");
        }

        const emailAlreadyExists = await this.adminRepository.findOne({ where: { email: email } });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe.");
        }

        const adm = new Admin(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, RolesEnum.ADMIN)

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

    async list() {

        const admins = await this.adminRepository.find();

        return admins;

    }

    async search(searchParams: {
        firstName?: string,
        lastName?: string,
        age?: number,
        dni?: number,
        email?: string,
        userName?: string,
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
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        console.log("admin: " + admin);
        return admin;
    }

    async update({ id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName }: IAdminCreate) {

        const admin = await this.adminRepository
            .createQueryBuilder()
            .update(Admin)
            .set({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName })
            .where("id = :id", { id })
            .execute();
        if (admin.affected === 0) {
            throw new Error("No se encontro admin")
        }

    }

}

export { AdminService };
export const adminService = new AdminService();
