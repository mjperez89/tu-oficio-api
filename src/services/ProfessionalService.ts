import { Professional } from "../entities/Professional";
import { AppDataSource } from "../data-source";
import { RolesEnum } from "../entities/RolesEnum";

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
    professionalRepository = AppDataSource.getRepository(Professional);

    async create({ firstName, lastName, phoneNumber, email, address, birthDate, dni, password, registrationNumber, specialty }: IProfessionalCreate) {
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
        const age = calculateAge(birthDate)
        const userName = generateRandomUsername(firstName, lastName);
        const yearsOfExperience = "0"

        const professional = new Professional(
            firstName, lastName, age.toString(), phoneNumber, email, address, birthDate, dni, userName, password,
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
        age?: String,
        phoneNumber?: String,
        email?: String,
        address?: String,
        birthDate?: String,
        dni?: String,
        userName?: String,
        password?: String,
        registrationNumber?: String,
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
            .orWhere("password like :password", { password: `%${searchParams.password}%` })
            .orWhere("phoneNumber like :phoneNumber", { phoneNumber: `%${searchParams.phoneNumber}%` })
            .orWhere("address like :address", { address: `%${searchParams.address}%` })
            .getMany();

        return professional;
    }

    async update({
        id, firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password,
        registrationNumber, specialty, yearsOfExperience }: IProfessionalCreate) {

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
    async getProfessionalLogin(email, reqPassword) {

        const professional = await this.professionalRepository.findOne({ where: { email: email } });

        console.log(professional.firstName)
        const password = professional.dni.toString()
        if (reqPassword != password) {
            throw new Error("Constraseña incorrecta")
        }

        return professional;
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

export { ProfessionalService };
export const professionalService = new ProfessionalService();
