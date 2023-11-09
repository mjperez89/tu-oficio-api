import { Client } from "../entities/Client";
import { AppDataSource } from "../index"
import { RolesEnum } from "../entities/RolesEnum";

interface IClientCreate {
    id?: number;
    firstName: string;
    lastName: string;
    age?: string;
    phoneNumber: string;
    email: string;
    address: string;
    birthDate: string;
    dni: string;
    userName?: string;
    password: string;
}

class ClientService {

    clientRepository = AppDataSource.getRepository(Client)


    async create({ firstName, lastName, phoneNumber, email, address, birthDate, dni, password }: IClientCreate) {
        if (!firstName || !lastName || !phoneNumber || !email || !address || !birthDate || !dni || !password) {
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

        const age = calculateAge(birthDate)

        const userName = generateRandomUsername(firstName, lastName);

        const client = new Client(firstName, lastName, age.toString(), phoneNumber, email, address, birthDate, dni, userName, password, RolesEnum.CLIENT)

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
        age?: string,
        dni?: string,
        email?: string,
        userName?: string,
        password?: string,
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
            .orWhere("password like :password", { password: `%${searchParams.password}%` })
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        console.log("cliente" + client);
        return client;
    }

    async update({ id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password }: IClientCreate) {

        const client = await this.clientRepository
            .createQueryBuilder()
            .update(Client)
            .set({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password })
            .where("id = :id", { id })
            .execute();
        if (client.affected === 0) {
            throw new Error("No se encontro cliente")
        }

    }

    async getClientLogin(email, reqPassword) {

        const client = await this.clientRepository.findOne({ where: { email: email } });

        console.log(client.firstName)
        const password = client.password
        if (reqPassword != password) {
            throw new Error("Constraseña incorrecta")
        }
        return client;
    }
}
function generateRandomUsername(firstName: string, lastName: string): string {
    const randomUsername = `${firstName[0]}${lastName[0]}_${Math.floor(Math.random() * 10000)}`;
    return randomUsername;
}

function calculateAge(birthDate: string) {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    if (today.getMonth() < birthDateObj.getMonth() || (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age
}

export { ClientService };
export const clientService = new ClientService();
