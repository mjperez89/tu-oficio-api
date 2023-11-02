import { Connection, Repository, getCustomRepository } from "typeorm";
import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../entities/Client";
// import { AppDataSource } from "../index"
import { RolesEnum } from "../entities/RolesEnum";
import { error } from "console";
import { MySQLDatabase } from "../database/mysql-database";

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
    private connection: Connection;
    private clientRepository: Repository<Client>;
    // clientRepository = AppDataSource.getRepository(Client)

    // constructor() {
    //     // Create an instance of your database connection class (MySQLDatabase)
    //     const db = new MySQLDatabase(databaseConfig);
    //     this.connection = db.getConnection(); // Get the database connection
    
    //     // Get the repository for the Professional entity
    //     this.clientRepository = this.connection.getRepository(Client);
    //   }

    async create({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName }: IClientCreate) {
        if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName) {
            throw new Error("Por favor complete todos los datos.");
        }

        const clientAlreadyExists = await this.clientRepository.findOne({ where: { dni: dni } });

        if (clientAlreadyExists) {
            throw new Error("Cliente ya existe.");
        }

        const emailAlreadyExists = await this.clientRepository.findOne({ where: { email: email } });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe.");
        }

        const client = new Client(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, RolesEnum.CLIENT)

        await this.clientRepository.save(client);

        return client;
    }


    async delete(id: number) {

        const client = await this.clientRepository
            .createQueryBuilder()
            .delete()
            .from(Client)
            .where("id = :id", { id })
            .execute();

        if (client.affected === 0) {
            throw new Error(`No se encontró ningún registro con el ID ${id}`);
        }
        console.log(client);

        return client;
    }

    async getData(id: number) {

        const client = await this.clientRepository.findOne({ where: { id: id } });

        return client;

    }

    async list() {

        const clients = await this.clientRepository.find();

        return clients;

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


        const client = await this.clientRepository
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

        console.log("cliente" + client);
        return client;
    }

    async update({ id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName }: IClientCreate) {

        const client = await this.clientRepository
            .createQueryBuilder()
            .update(Client)
            .set({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName })
            .where("id = :id", { id })
            .execute();
        if (client.affected === 0) {
            throw new Error("No se encontro cliente")
        }

    }

}

export { ClientService };
export const clientService = new ClientService();
