import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ProfessionsEnum } from "./ProfessionsEnum";

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

    @Column({type: "bigint"})
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
    profession: ProfessionsEnum;

    constructor(firstName: string, lastName: string, age: number, phoneNumber: number, email: string, address: string, birthDate: Date, dni: number, userName: string, profession: ProfessionsEnum) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.email = email
        this.address = address
        this.birthDate = birthDate
        this.dni = dni
        this.userName = userName
        this.profession = profession
    }


}
