import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import auth from "../../lib/auth";

const clientRoutes = Router();
const clientController  = new ClientController();

clientRoutes.post("/login-client", clientController.handleLoginClient);
clientRoutes.get("/list-client", clientController.handleListClients);
clientRoutes.post("/add-client", clientController.handleCreateClient);
clientRoutes.get("/searchClient", clientController.handleSearchClient);
clientRoutes.post("/edit-client", clientController.handleUpdateClient);
clientRoutes.get("/get-client", clientController.handleGetClientData);
clientRoutes.post("/delete-client", clientController.handleDeleteClient);

export { clientRoutes };