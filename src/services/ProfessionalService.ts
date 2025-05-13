import { Professional } from "../entities/Professional";
import { getRepository } from "../database";
import { RolesEnum } from "../entities/RolesEnum";
import * as helpers from "../../lib/helpers"

interface IProfessionalCreate {
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
    registrationNumber: string;
    specialty: string;
    yearsOfExperience?: string;
}

class ProfessionalService {
    private professionalRepository;
    // professionalRepository = getConnection().getRepository(Professional);

    constructor() {
        this.initRepository();
    }

    async initRepository() {
        this.professionalRepository = await getRepository<Professional>(Professional);
    };

    async create({ firstName, lastName, phoneNumber, email, address, birthDate, dni, password, registrationNumber, specialty }: IProfessionalCreate) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        if (!firstName || !lastName || !phoneNumber || !email || !address || !birthDate || !dni || !password || !registrationNumber || !specialty) {
            throw new Error("Por favor complete todos los datos.");
        }

        const professionalAlreadyExists = await this.professionalRepository.findOne({ where: { dni: dni } });

        if (professionalAlreadyExists) {
            throw new Error("Profesional ya existe.");
        }

        const emailAlreadyExists = await this.professionalRepository.findOne({ where: { email: email } });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe.");
        }
        const age = helpers.calculateAge(birthDate);
        const userName = helpers.generateRandomUsername(firstName, lastName);
        const yearsOfExperience = "0";
        const hashedPassword = await helpers.encryptPassword(password);

        if (!hashedPassword) {
            throw new Error("Error al encriptar la contraseña");
        }

        const professional = new Professional(
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
            RolesEnum.PROFESSIONAL,
            registrationNumber,
            specialty,
            yearsOfExperience
        );

        await this.professionalRepository.save(professional);
        return professional;
    }


    async delete(id: number) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .delete()
            .from(Professional)
            .where("id = :id", { id })
            .execute();

        if (professional.affected === 0) {
            throw new Error(`No se encontró ningún registro con el ID ${id}`);
        }
        console.log(professional)
        return professional;
    }

    async getData(email: string) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }
        const professional = await this.professionalRepository.findOne({ where: { email: email } });
        professional.password = "****"
        return professional;
    }

    async list() {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        const professionals = await this.professionalRepository.find();

        return professionals;
    }

    async search(searchParams: {
        firstName?: String,
        lastName?: String,
        age?: String,
        phoneNumber?: String,
        email?: String,
        address?: String,
        birthDate?: String,
        dni?: String,
        userName?: String,
        // password?: String,
        registrationNumber?: String,
        specialty?: String,
        yearsOfExperience?: String
    }) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        if (!Object.values(searchParams).some(param => param !== undefined)) {
            throw new Error("Por favor rellene al menos un campo de búsqueda");
        }

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .where("firstName like :firstName", { firstName: `%${searchParams.firstName}%` })
            .orWhere("lastName like :lastName", { lastName: `%${searchParams.lastName}%` })
            .orWhere("dni like :dni", { dni: `%${searchParams.dni}%` })
            .orWhere("email like :email", { email: `%${searchParams.email}%` })
            .orWhere("userName like :userName", { userName: `%${searchParams.userName}%` })
            // .orWhere("password like :password", { password: `%${searchParams.password}%` })
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        return professional;
    }

    async update({
        id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password,
        registrationNumber, specialty, yearsOfExperience }: IProfessionalCreate) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .update(Professional)
            .set({
                firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password,
                registrationNumber, specialty, yearsOfExperience
            })
            .where("id = :id", { id })
            .execute();

        if (professional.affected === 0) {
            throw new Error("No se encontro admin")
        }
    }
    async getProfessionalLogin(email: string, reqPassword: string) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        const professional = await this.professionalRepository.findOne({ where: { email: email } });
        console.log(professional)

        // if (reqPassword != password) {
        if (!helpers.matchPassword(reqPassword, professional.password)) {
            throw new Error("Constraseña incorrecta")
        }
        return professional;
    }

    async getById(id: number) {
        // esperamos hasta que el repositorio esté inicializado
        if (!this.professionalRepository) {
            await this.initRepository();
        }

        const professional = await this.professionalRepository.findOne({ where: { id: id } });

        if (!professional) {
            throw new Error(`No se encontró ningún profesional con el ID ${id}`);
        }

        return professional;
    }
}

export { ProfessionalService };
// export const professionalService = new ProfessionalService();717
export const createAdminService = async () => {
    const service = new ProfessionalService();
    await service.initRepository();
    return service;
};
