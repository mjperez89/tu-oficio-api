import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { ProfesionsEnum } from "./ProfesionsEnum";

@Entity()
export class Profesional extends User {

    @PrimaryGeneratedColumn()
    id: number


    constructor(firstName: string, lastName: string, age: number, phoneNumber: number, email: string, address: string, birthDate: Date, dni: number, userName: string, profesion: ProfesionsEnum) {
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, profesion)
    }
    
}