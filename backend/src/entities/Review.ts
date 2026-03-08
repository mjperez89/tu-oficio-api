import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    professionalId: number

    @Column()
    clientName: string

    @Column({ type: "int" })
    rating: number  // 1-5

    @Column({ type: "text" })
    comment: string

    @CreateDateColumn()
    createdAt: Date
}
