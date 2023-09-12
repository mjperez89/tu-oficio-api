import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ProfesionsEnum } from "./ProfesionsEnum";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    phoneNumber: number

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    birthDate: Date

    @Column()
    dni: number

    @Column()
    userName: string

    @Column()
    profesion: ProfesionsEnum;

    constructor(firstName: string, lastName: string, age: number, phoneNumber: number, email: string, address: string, birthDate: Date, dni: number, userName: string, profesion: ProfesionsEnum) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.email = email
        this.address = address
        this.birthDate = birthDate
        this.dni = dni
        this.userName = userName
        this.profesion = profesion
    }


}
