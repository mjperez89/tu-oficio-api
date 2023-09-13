import { getCustomRepository } from "typeorm";
import { ProfessionalRepository } from "../repositories/ProfessionalRepository";
import { Professional } from "../entities/Professional";

interface IProfessionalCreate {
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
    registrationNumber: number;
    specialty: string;
    yearsOfExperience: number;
}

class ProfessionalService {  

async create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, registrationNumber, specialty, yearsOfExperience}: IProfessionalCreate) {
    if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName || !registrationNumber || !specialty || !yearsOfExperience) {
        throw new Error("Por favor complete todos los datos.");
    }

    const professionalRepository = getCustomRepository(ProfessionalRepository);

    const professionalAlreadyExists = await professionalRepository.findOne({dni});

    if (professionalAlreadyExists) {
        throw new Error("Profesional ya existe.");
    }

    const emailAlreadyExists = await professionalRepository.findOne({email});

    if (emailAlreadyExists) {
        throw new Error("Email ya existe.");
    }

    const professional = professionalRepository.create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName});

    await professionalRepository.save(professional);
    
    return professional;
}


async delete(id: number) {
    const professionalRepository = getCustomRepository(ProfessionalRepository);

    const professional = await professionalRepository
    .createQueryBuilder()
    .delete()
    .from(Professional)
    .where("id = :id", { id })
    .execute();

    return professional;
}

async getData(id: number) {

    const professionalRepository = getCustomRepository(ProfessionalRepository);

    const professional = await professionalRepository.findOne({id});

    return professional;

}

async list() {
    const professionalRepository = getCustomRepository(ProfessionalRepository);

    const clients = await professionalRepository.find();

    return clients;

}

async search(search: string) {
    if (!search) {
        throw new Error("Por favor rellene todos los campos");
    }

const professionalRepository = getCustomRepository(ProfessionalRepository);

const professional = await professionalRepository
    .createQueryBuilder()
    .where("firstName like :search", { search: `%${search}%` })
    .orWhere("lastName like :search", { search: `%${search}%` })
    .orWhere("dni like :search", { search: `%${search}%` })
    .orWhere("email like :search", { search: `%${search}%` })
    .orWhere("userName like :search", { search: `%${search}%` })
    .orWhere("phoneNumber like :search", { search: `%${search}%` })
    .orWhere("address like :search", { search: `%${search}%` })
    .getMany();

    return professional;
}

async update({id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IProfessionalCreate) {
    const professionalRepository = getCustomRepository(ProfessionalRepository);

    const professional = await professionalRepository
    .createQueryBuilder()
    .update(Professional)
    .set({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName})
    .where("id = :id", { id })
    .execute();

    return professional;
}

}

export { ProfessionalService };
export const professionalService = new ProfessionalService();
