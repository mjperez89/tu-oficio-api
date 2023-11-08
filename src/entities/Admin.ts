import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { RolesEnum } from "./RolesEnum";


@Entity({ name: "admins" })
export class Admin extends User {

    @PrimaryGeneratedColumn()
    id: number

    constructor(
        firstName: string, 
        lastName: string, 
        age: string, 
        phoneNumber: string, 
        email: string, 
        address: string, 
        birthDate: string, 
        dni: string, 
        userName: string, 
        password: string,
        role: RolesEnum
        ){
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, role)
    }
}