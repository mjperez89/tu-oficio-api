import express = require("express");
import bodyParser = require("body-parser");
import { connectDatabase, disconnectDatabase } from "./database";
import { adminRoutes } from "./routes/AdminRoutes";
import { professionalRoutes } from "./routes/ProfessionalRoutes";
import { clientRoutes } from "./routes/ClientRoutes";

const app = express();
const port = 3000;
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001', // Reemplaza con la URL de tu aplicación React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Inicializamos conexión a DB
// const dbService = DatabaseService.getInstance();

async function startServer() {
    try {
        await connectDatabase();
        console.log('Database connected, getConnection should work now.');

        // primero conectamos DB, luego instanciamos servicios
        app.use(cors(corsOptions));
        app.use(bodyParser.json());
        app.use(adminRoutes);
        app.use(professionalRoutes);
        app.use(clientRoutes);
        
        app.listen(port, () => {
            console.log(`Aplicación escuchando en puerto ${port}`);
        });

        // Graceful shutdown!
        process.on('SIGTERM', async () => {
            console.log('señal SIGTERM recibida. Cerrando server HTTP y conexión a DB');
            await disconnectDatabase();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error conectando al server:', error);
        process.exit(1);
    }
}

startServer();

// export const getConnection = () => dbService.getConnection();