import "reflect-metadata";
import { DataSource, createConnection, Connection } from "typeorm";
import { CustomDatabaseConfig } from '../config/database-config';

export class MySQLDatabase {
  private connection: Connection | null = null;

  constructor(private config: CustomDatabaseConfig) {}

  async connect(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection({
        type: "mysql",
        host: this.config.host,
        port: this.config.port,
        username: this.config.username,
        password: this.config.password,
        database: this.config.database,
        synchronize: this.config.synchronize,
        logging: this.config.logging,
        entities: this.config.entities,
        migrations: this.config.migrations,
        subscribers: this.config.subscribers,
      });
    }
    return this.connection;
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Database connection has not been established.');
    }
    return this.connection;
  }
}