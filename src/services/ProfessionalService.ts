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
        // const professionalRepository = getCustomRepository(ProfessionalRepository);

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .delete()
            .from(Professional)
            .where("id = :id", { id })
            .execute();

        return professional;
    }

    async getData(id: number) {

        // const professionalRepository = getCustomRepository(ProfessionalRepository);

        const professional = await this.professionalRepository.findOne({ where: { id: id } });

        return professional;

    }

    async list() {
        // const professionalRepository = getCustomRepository(ProfessionalRepository);

        const clients = await this.professionalRepository.find();

        return clients;

    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor rellene todos los campos");
        }

        // const professionalRepository = getCustomRepository(ProfessionalRepository);

        const professional = await this.professionalRepository
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

    async update({
        id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName,
        registrationNumber, specialty, yearsOfExperience }: IProfessionalCreate) {
        // const professionalRepository = getCustomRepository(ProfessionalRepository);

        const professional = await this.professionalRepository
            .createQueryBuilder()
            .update(Professional)
            .set({
                firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName,
                registrationNumber, specialty, yearsOfExperience
            })
            .where("id = :id", { id })
            .execute();

        return professional;
    }

}

export { ProfessionalService };
export const professionalService = new ProfessionalService();
