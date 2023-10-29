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

async create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IAdminCreate) {
    if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName) {
        throw new Error("Por favor complete todos los datos.");
    }


    const adminAlreadyExists = await this.adminRepository.findOne({where:{dni:dni}});

    if (adminAlreadyExists) {
        throw new Error("Admin ya existe.");
    }

    const emailAlreadyExists = await this.adminRepository.findOne({where:{email:email}});

    if (emailAlreadyExists) {
        throw new Error("Email ya existe.");
    }
    
    const adm = new Admin(firstName,lastName,age,phoneNumber,email,address,birthDate,dni,userName,RolesEnum.ADMIN)
    
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

    return admin;
}

async getData(id: number) {


    const admin = await this.adminRepository.findOne({where:{id:id}});

    return admin;

}

async list() {

    const admins = await this.adminRepository.find();

    return admins;

}

async search(search: string) {
    if (!search) {
        throw new Error("Por favor rellene todos los campos");
    }


const admin = await this.adminRepository
    .createQueryBuilder()
    .where("firstName like :search", { search: `%${search}%` })
    .orWhere("lastName like :search", { search: `%${search}%` })
    .orWhere("dni like :search", { search: `%${search}%` })
    .orWhere("email like :search", { search: `%${search}%` })
    .orWhere("userName like :search", { search: `%${search}%` })
    .orWhere("phoneNumber like :search", { search: `%${search}%` })
    .orWhere("address like :search", { search: `%${search}%` })
    .getMany();

    return admin;
}

async update({id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IAdminCreate) {
    
    const admin = await this.adminRepository
    .createQueryBuilder()
    .update(Admin)
    .set({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName})
    .where("id = :id", { id })
    .execute();
    if (admin.affected === 0 ){
        throw new Error ("No se encontro admin")
    }

}

}

export { AdminService };
export const adminService = new AdminService();
