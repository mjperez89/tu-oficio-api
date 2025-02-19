import { DatabaseService } from "./services/DatabaseService";

const dbService = DatabaseService.getInstance();

export const getRepository = async <T>(entity: any) => {
    return await dbService.getRepository<T>(entity);
};

// export const getConnection = () => dbService.getConnection();
export const connectDatabase = () => dbService.connect();
export const disconnectDatabase = () => dbService.disconnect();