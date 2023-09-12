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

    const client = profesionalRepository.create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName});

    await profesionalRepository.save(client);
    
    return client;
}


async delete(id: number) {
    const clientRepository = getCustomRepository(ClientRepository);

    const client = await clientRepository
    .createQueryBuilder()
    .delete()
    .from(Client)
    .where("id = :id", { id })
    .execute();

    return client;
}

async getData(id: number) {

    const clientRepository = getCustomRepository(ClientRepository);

    const client = await clientRepository.findOne({id});

    return client;

}

async list() {
    const clientRepository = getCustomRepository(ClientRepository);

    const clients = await clientRepository.find();

    return clients;

}

async search(search: string) {
    if (!search) {
        throw new Error("Por favor rellene todos los campos");
    }

const clientRepository = getCustomRepository(ClientRepository);

const client = await clientRepository
    .createQueryBuilder()
    .where("firstName like :search", { search: `%${search}%` })
    .orWhere("lastName like :search", { search: `%${search}%` })
    .orWhere("dni like :search", { search: `%${search}%` })
    .orWhere("email like :search", { search: `%${search}%` })
    .orWhere("userName like :search", { search: `%${search}%` })
    .orWhere("phoneNumber like :search", { search: `%${search}%` })
    .orWhere("address like :search", { search: `%${search}%` })
    .getMany();

    return client;
}

async update({id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IClientCreate) {
    const clientRepository = getCustomRepository(ClientRepository);

    const client = await clientRepository
    .createQueryBuilder()
    .update(Client)
    .set({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName})
    .where("id = :id", { id })
    .execute();

    return client;
}

}

export { ClientService };
export const clientService = new ClientService();
