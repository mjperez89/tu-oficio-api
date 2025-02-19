import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

export class DatabaseService {
    private static databaseService: DatabaseService;
    private connection: DataSource | null = null;

    private constructor() {
        dotenv.config();
    }

    public async getRepository<T>(entityClass: any): Promise<import("typeorm").Repository<T>> {
        if (!this.connection || !this.connection.isInitialized) {
            await this.connect();
        }
        return this.connection.getRepository<T>(entityClass);
    }

    private getConfig(): DataSourceOptions {
        const variablesEnv = [
            'DB_TYPE',
            'DB_HOST',
            'DB_PORT',
            'DB_USERNAME',
            'DB_PASSWORD',
            'DB_DATABASE'
        ];

        // Validar las variables necesarias para la conexión en .env
        for (const variable of variablesEnv) {
            if (!process.env[variable]) {
                throw new Error(`Falta variable de conexión: ${variable}`);
            }
        }

        return {
            type: process.env.DB_TYPE as "mysql" | "mariadb" | "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.NODE_ENV !== 'production', // Solo para ambiente desarrollo
            logging: process.env.NODE_ENV !== 'production',
            entities: ["src/entities/*.ts"],
            migrations: ["src/database/migrations/*.ts"],
            subscribers: [],
            ssl: process.env.DB_SSL === 'true' ? {
                rejectUnauthorized: false
            } : false
        };
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.databaseService) {
            DatabaseService.databaseService = new DatabaseService();
        }
        return DatabaseService.databaseService;
    }

    public async connect(): Promise<DataSource> {
        try {
            if (!this.connection || !this.connection.isInitialized) {
                const config = this.getConfig();
                this.connection = new DataSource(config);
                await this.connection.initialize();
                console.log('DB conectada correctamente.');
            }
            return this.connection;
        } catch (error) {
            console.error('Error conectando a BD:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            if (this.connection && this.connection.isInitialized) {
                await this.connection.destroy();
                this.connection = null;
                console.log('Conexión cerrada correctamente.');
            }
        } catch (error) {
            console.error('Error desconectando de DB:', error);
            throw error;
        }
    }

    public getConnection(): DataSource {
        if (!this.connection || !this.connection.isInitialized) {
            throw new Error('La conexión no está instanciada. Llame a connect() primero.');
        }
        return this.connection;
    }
    // public static getConnection(): DataSource {
    //     if (!this.connection || !this.connection.isInitialized) {
    //         throw new Error('La conexión no está instanciada. Llame a connect() primero.');
    //     }
    //     return this.connection;
    // }
}
