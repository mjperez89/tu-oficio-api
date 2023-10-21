import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../repositories/AdminRepository";
import { Admin } from "../entities/Admin";
import { get } from "http";

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

async create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IAdminCreate) {
    if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName) {
        throw new Error("Por favor complete todos los datos.");
    }
    console.log("acaba de entrar al service")
    const adminRepository = getCustomRepository(AdminRepository);

    // const adminAlreadyExists = await adminRepository.findOne({where:{dni:dni}});

    // if (adminAlreadyExists) {
    //     throw new Error("Admin ya existe.");
    // }

    // const emailAlreadyExists = await adminRepository.findOne({where:{email:email}});

    // if (emailAlreadyExists) {
    //     throw new Error("Email ya existe.");
    // }
    // console.log("no encontro nada y va a crear")
    const admin = adminRepository.create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName});
    
    await adminRepository.save(admin);
    console.log("se creo y guardo en la db")

    
    return admin;
}


async delete(id: number) {
    const adminRepository = getCustomRepository(AdminRepository);

    const admin = await adminRepository
    .createQueryBuilder()
    .delete()
    .from(Admin)
    .where("id = :id", { id })
    .execute();

    return admin;
}

async getData(id: number) {

    const adminRepository = getCustomRepository(AdminRepository);

    const admin = await adminRepository.findOne({where:{id:id}});

    return admin;

}

async list() {
    const adminRepository = getCustomRepository(AdminRepository);

    const admins = await adminRepository.find();

    return admins;

}

async search(search: string) {
    if (!search) {
        throw new Error("Por favor rellene todos los campos");
    }

const adminRepository = getCustomRepository(AdminRepository);

const admin = await adminRepository
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
    const adminRepository = getCustomRepository(AdminRepository);

    const admin = await adminRepository
    .createQueryBuilder()
    .update(Admin)
    .set({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName})
    .where("id = :id", { id })
    .execute();

    return admin;
}

}

export { AdminService };
export const adminService = new AdminService();
