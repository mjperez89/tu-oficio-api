import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { RolesEnum } from "./RolesEnum";

@Entity({ name: "professionals" })
export class Professional extends User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    registrationNumber: string

    @Column()
    specialty: string

    @Column()
    yearsOfExperience: string

    @Column()
    biography: string

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
        role: RolesEnum,
        profilePhotoUrl: string,
        registrationNumber: string,
        specialty: string,
        yearsOfExperience: string,
        biography: string
    ) {
        super(firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, role, profilePhotoUrl)
        this.registrationNumber = registrationNumber;
        this.specialty = specialty;
        this.yearsOfExperience = yearsOfExperience;
        this.biography = biography
    }

}