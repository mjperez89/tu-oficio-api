import { getCustomRepository } from "typeorm";
import { ProfesionalRepository } from "../repositories/ProfesionalRepository";
import { Profesional } from "../entities/Profesional";

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

    const profesionalRepository = getCustomRepository(ProfesionalRepository);

    const profesionalAlreadyExists = await profesionalRepository.findOne({dni});

    if (profesionalAlreadyExists) {
        throw new Error("Profesional ya existe.");
    }

    const emailAlreadyExists = await profesionalRepository.findOne({email});

    if (emailAlreadyExists) {
        throw new Error("Email ya existe.");
    }

    const profesional = profesionalRepository.create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName});

    await profesionalRepository.save(profesional);
    
    return profesional;
}


async delete(id: number) {
    const profesionalRepository = getCustomRepository(ProfesionalRepository);

    const profesional = await profesionalRepository
    .createQueryBuilder()
    .delete()
    .from(Profesional)
    .where("id = :id", { id })
    .execute();

    return profesional;
}

async getData(id: number) {

    const profesionalRepository = getCustomRepository(ProfesionalRepository);

    const profesional = await profesionalRepository.findOne({id});

    return profesional;

}

async list() {
    const clientRepository = getCustomRepository(ProfesionalRepository);

    const profesionals = await clientRepository.find();

    return profesionals;

}

async search(search: string) {
    if (!search) {
        throw new Error("Por favor rellene todos los campos");
    }

const profesionalRepository = getCustomRepository(ProfesionalRepository);

const profesional = await profesionalRepository
    .createQueryBuilder()
    .where("firstName like :search", { search: `%${search}%` })
    .orWhere("lastName like :search", { search: `%${search}%` })
    .orWhere("dni like :search", { search: `%${search}%` })
    .orWhere("email like :search", { search: `%${search}%` })
    .orWhere("userName like :search", { search: `%${search}%` })
    .orWhere("phoneNumber like :search", { search: `%${search}%` })
    .orWhere("address like :search", { search: `%${search}%` })
    .getMany();

    return profesional;
}

async update({id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IProfessionalCreate) {
    const profesionalRepository = getCustomRepository(ProfesionalRepository);

    const profesional = await profesionalRepository
    .createQueryBuilder()
    .update(Profesional)
    .set({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName})
    .where("id = :id", { id })
    .execute();

    return profesional;
}

}

export { ProfessionalService };
export const clientService = new ProfessionalService();
