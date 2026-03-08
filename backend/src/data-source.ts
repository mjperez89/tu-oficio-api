import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Review } from "./entities/Review"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Review],
    migrations: [],
    subscribers: [],
})
