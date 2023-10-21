import { Router } from "express";
import { ProfessionalController } from "../controllers/ProfessionalController";
import auth from "../../lib/auth";

const professionalRoutes = Router();
const professionalController  = new ProfessionalController();

professionalRoutes.get("/professional", auth.isLoggedIn, professionalController.handleListProfessionals);
professionalRoutes.get("professional/add-professional", auth.isLoggedIn, (request, response) => {
    response.render("professional/addprofessional")});
professionalRoutes.post("/add-professional", auth.isLoggedIn, professionalController.handleCreateProfessional);
professionalRoutes.get("/searchProfessional", auth.isLoggedIn, professionalController.handleSearchProfessional);
professionalRoutes.post("/edit-professional", auth.isLoggedIn, professionalController.handleUpdateProfessional);
professionalRoutes.get("/editProfessional", auth.isLoggedIn, professionalController.handleGetProfessionalData);
professionalRoutes.post("/delete-professional", auth.isLoggedIn, professionalController.handleDeleteProfessional);

export { professionalRoutes };