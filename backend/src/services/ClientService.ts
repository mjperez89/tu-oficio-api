import { getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../entities/Client";
import { get } from "http";

interface IClientCreate {
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

class ClientService {  

async create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName}: IClientCreate) {
    if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName) {
        throw new Error("Por favor complete todos los datos.");
    }

    const clientRepository = getCustomRepository(ClientRepository);

    const clientAlreadyExists = await clientRepository.findOne({dni});

    if (clientAlreadyExists) {
        throw new Error("Cliente ya existe.");
    }

    const emailAlreadyExists = await clientRepository.findOne({email});

    if (emailAlreadyExists) {
        throw new Error("Email ya existe.");
    }

    const client = clientRepository.create({firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName});

    await clientRepository.save(client);
    
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
