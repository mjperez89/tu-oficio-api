import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "jp",
  password: "1709",
  database: "tu_oficio_api",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/"],
  subscribers: [],  
};

export default config;

export interface CustomDatabaseConfig {
    type: "mysql";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
    subscribers: any[];
  }

// export const databaseConfig: CustomDatabaseConfig = {
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "user",
//   password: "password",
//   database: "user_database",
//   synchronize: true,
//   logging: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/database/migrations/"],
//   subscribers: [],
// };
