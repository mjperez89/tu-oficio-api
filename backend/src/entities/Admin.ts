import { Entity } from "typeorm"
import { User } from "./User"
import { Role } from "./Role"

@Entity()
export class Admin extends User {

    constructor(
        firstName: string,
        lastName: string,
        age: number,
        phoneNumber: number,
        email: string,
        password: string,
        address: string,
        birthDate: Date,
        dni: number,
        userName: string
    ) {
        super(firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName, Role.ADMIN)
    }
}
