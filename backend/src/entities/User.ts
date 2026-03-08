import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Role } from "./Role"

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

    @Column({ type: "bigint" })
    phoneNumber: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    address: string

    @Column()
    birthDate: Date

    @Column({ unique: true })
    dni: number

    @Column()
    userName: string

    @Column({ type: "varchar", default: Role.CLIENT })
    role: Role

    @Column({ nullable: true })
    specialty: string

    @Column({ nullable: true })
    yearsOfExperience: number

    @Column({ nullable: true })
    registrationNumber: number

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
        role: Role
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.email = email
        this.password = password
        this.address = address
        this.birthDate = birthDate
        this.dni = dni
        this.userName = userName
        this.role = role
    }
}
