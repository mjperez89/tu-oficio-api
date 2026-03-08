import { Entity, Column } from "typeorm"
import { User } from "./User"
import { Role } from "./Role"

@Entity()
export class Profesional extends User {

    @Column({ nullable: true })
    registrationNumber: number

    @Column({ nullable: true })
    specialty: string

    @Column({ nullable: true })
    yearsOfExperience: number

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
        userName: string,
        registrationNumber: number,
        specialty: string,
        yearsOfExperience: number
    ) {
        super(firstName, lastName, age, phoneNumber, email, password, address, birthDate, dni, userName, Role.PROFESSIONAL)
        this.registrationNumber = registrationNumber
        this.specialty = specialty
        this.yearsOfExperience = yearsOfExperience
    }
}
