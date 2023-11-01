import { Professional } from "../entities/Professional";
import { AppDataSource } from "../data-source";
import { RolesEnum } from "../entities/RolesEnum";

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
    professionalRepository = AppDataSource.getRepository(Professional);

    async create({ firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, registrationNumber, specialty, yearsOfExperience }: IProfessionalCreate) {
        if (!firstName || !lastName || !age || !phoneNumber || !email || !address || !birthDate || !dni || !userName || !registrationNumber || !specialty || !yearsOfExperience) {
            throw new Error("Por favor complete todos los datos.");
        }

        // const professionalRepository = AppDataSource.getRepository(Professional);

        const professionalAlreadyExists = await this.professionalRepository.findOne({ where: { dni: dni } });

        if (professionalAlreadyExists) {
            throw new Error("Profesional ya existe.");
        }

        const emailAlreadyExists = await this.professionalRepository.findOne({ where: { email: email } });

        if (emailAlreadyExists) {
            throw new Error("Email ya existe.");
        }

        const professional = new Professional(
            firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName,
            RolesEnum.PROFESSIONAL, registrationNumber, specialty, yearsOfExperience);

        await this.professionalRepository.save(professional);

        return professional;
    }


    async delete(id: number) {
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

    async getData(id: number) {
        const professional = await this.professionalRepository.findOne({ where: { id: id } });

        return professional;

    }

    async list() {
        const professionals = await this.professionalRepository.find();

        return professionals;

    }

    async search(searchParams: {
        firstName?: String,
        lastName?: String,
        age?: Number,
        phoneNumber?: String,
        email?: String,
        address?: String,
        birthDate?: Date,
        dni?: Number,
        userName?: String,
        registrationNumber?: Number,
        specialty?: String,
        yearsOfExperience?: String
    }) {
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
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        return professional;
    }

    async update({
        id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName,
        registrationNumber, specialty, yearsOfExperience }: IProfessionalCreate) {

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .update(Professional)
            .set({
                firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName,
                registrationNumber, specialty, yearsOfExperience
            })
            .where("id = :id", { id })
            .execute();

        if (professional.affected === 0) {
            throw new Error("No se encontro admin")
        }
    }

}

export { ProfessionalService };
export const professionalService = new ProfessionalService();
