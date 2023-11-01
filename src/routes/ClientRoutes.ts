import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import auth from "../../lib/auth";

const clientRoutes = Router();
const clientController  = new ClientController();

clientRoutes.get("/client", clientController.handleListClients);
clientRoutes.post("/add-client", clientController.handleCreateClient);
clientRoutes.get("/searchClient", clientController.handleSearchClient);
clientRoutes.post("/edit-client", clientController.handleUpdateClient);
clientRoutes.get("/editClient", clientController.handleGetClientData);
clientRoutes.post("/delete-client", clientController.handleDeleteClient);

export { clientRoutes };