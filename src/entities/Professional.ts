import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { RolesEnum } from "./RolesEnum";

@Entity({name: "professionals"})
export class Professional extends User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    registrationNumber: number

    @Column()
    specialty: string

    @Column()
    yearsOfExperience: number

    constructor(
        firstName: string, 
        lastName: string, 
        age: number, 
        phoneNumber: number, 
        email: string, 
        address: string, 
        birthDate: Date, 
        dni: number, 
        userName: string, 
        role: RolesEnum,
        registrationNumber: number,
        specialty: string,
        yearsOfExperience: number
        ) {
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, role)
            this.registrationNumber = registrationNumber;
            this.specialty = specialty;
            this.yearsOfExperience = yearsOfExperience;
    }
    
}