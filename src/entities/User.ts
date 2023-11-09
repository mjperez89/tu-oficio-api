import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { RolesEnum } from "./RolesEnum";

@Entity({ name: "users" })
export abstract class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: string

    // @Column({ type: "bigint" })
    @Column()
    phoneNumber: string

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    birthDate: string

    @Column()
    dni: string

    @Column()
    userName: string

    @Column()
    password: string

    @Column({ type: "enum", enum: RolesEnum, default: RolesEnum.CLIENT })
    role: RolesEnum;

    // agregar el path a la imagen de perfil (se puede poner en public/images)
    @Column()
    profilePhotoUrl: string

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
        profilePhotoUrl: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.email = email
        this.address = address
        this.birthDate = birthDate
        this.dni = dni
        this.userName = userName
        this.password = password
        this.role = role
        this.profilePhotoUrl = profilePhotoUrl
    }
}
