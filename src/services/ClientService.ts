import {Client} from "../entities/Client";
import {getRepository} from "../database"
import {RolesEnum} from "../entities/RolesEnum";
import * as helpers from "../../lib/helpers"

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
    private clientRepository;
    // clientRepository = getConnection().getRepository(Client)

    constructor() {
        this.initRepository();
    }

    async initRepository(){
        this.clientRepository = await getRepository<Client>(Client);
    };

    async create({ firstName, lastName, phoneNumber, email, address, birthDate, dni, password }: IClientCreate) {
        try {
            // esperamos hasta que el repositorio esté inicializado
            if (!this.clientRepository) {
                await this.initRepository();
            }

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

            const age = helpers.calculateAge(birthDate);
            const userName = helpers.generateRandomUsername(firstName, lastName);
            const hashedPassword = await helpers.encryptPassword(password);

            if (!hashedPassword) {
                throw new Error("Error al encriptar la contraseña");
            }

            const client = new Client(
                firstName,
                lastName,
                age.toString(),
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName,
                hashedPassword,
                RolesEnum.CLIENT
            );

            await this.clientRepository.save(client);
            return client;
        } catch (error) {
            throw error;
        }
    }


    async delete(id: number) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

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

    async getData(email: string) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

        const client = await this.clientRepository.findOne({ where: { email: email } });
        client.password = "****"
        return client;

    }

    async list() {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

        return await this.clientRepository.find();

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
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

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
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

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
        console.log(client)

        //if (reqPassword != password) {
        if (!helpers.matchPassword(reqPassword, client.password)) {
            throw new Error("Constraseña incorrecta")
        }
        return client;
    }

    async getById(id: number) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.clientRepository) {
            await this.initRepository();
        }

        const client = await this.clientRepository.findOne({ where: { id: id } });

        if (!client) {
            throw new Error(`No se encontró ningún cliente con el ID ${id}`);
        }

        return client;
    }
}

export { ClientService };
// export const clientService = new ClientService();
export const createAdminService = async () => {
    const service = new ClientService();
    await service.initRepository();
    return service;
};
