import { createConnection } from 'typeorm';
import config from '../config/database-config';

export const connect = async () => {
  try {
    const connection = await createConnection(config);
    console.log(`Connected to ${connection.options.database} database`);
  } catch (error) {
    console.error(error);
  }
};
