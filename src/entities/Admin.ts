import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { RolesEnum } from "./RolesEnum";


@Entity({name:"admins"})
export class Admin extends User {

    @PrimaryGeneratedColumn()
    id: number

    constructor(firstName: string, lastName: string, age: number, phoneNumber: number, email: string, address: string, birthDate: Date, dni: number, userName: string, role: RolesEnum) {
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, role)
    }
}