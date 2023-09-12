import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User} from "./User";
import { ProfessionsEnum } from "./ProfessionsEnum";


@Entity()
export class Admin extends User {

    @PrimaryGeneratedColumn()
    id: number

    constructor(firstName: string, lastName: string, age: number, phoneNumber: number, email: string, address: string, birthDate: Date, dni: number, userName: string, profession:ProfessionsEnum) {
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, profession)
    }
}