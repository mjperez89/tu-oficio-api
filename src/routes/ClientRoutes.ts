import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import auth from "../../lib/auth";

const clientRoutes = Router();
const clientController  = new ClientController();

clientRoutes.get("/client", auth.isLoggedIn, clientController.handleListClients);
clientRoutes.get("client/add-client", auth.isLoggedIn, (request, response) => {
    response.render("client/addclient")});
clientRoutes.post("/add-client", auth.isLoggedIn, clientController.handleCreateClient);
clientRoutes.get("/searchClient", auth.isLoggedIn, clientController.handleSearchClient);
clientRoutes.post("/edit-client", auth.isLoggedIn, clientController.handleUpdateClient);
clientRoutes.get("/editClient", auth.isLoggedIn, clientController.handleGetClientData);
clientRoutes.post("/delete-client", auth.isLoggedIn, clientController.handleDeleteClient);

export { clientRoutes };