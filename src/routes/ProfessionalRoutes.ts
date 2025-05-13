import { Router } from "express";
import { ProfessionalController } from "../controllers/ProfessionalController";
import auth from "../../lib/auth";

const professionalRoutes = Router();
const professionalController  = new ProfessionalController();

professionalRoutes.post("/login-professional", professionalController.handleLoginProfessional);
// deshabilitamos temporalmente auth.isLoggedIn hasta definir el método de autenticación
professionalRoutes.get("/list-professionals", professionalController.handleListProfessionals);
// professionalRoutes.get("professional/add-professional", (request, response) => {
    // response.render("professional/addprofessional")});
professionalRoutes.post("/add-professional", professionalController.handleCreateProfessional);
professionalRoutes.get("/searchProfessional", professionalController.handleSearchProfessional);
professionalRoutes.put("/edit-professional/:id", professionalController.handleUpdateProfessional);
professionalRoutes.get("/get-professional", professionalController.handleGetProfessionalData);
professionalRoutes.get("/professional/:id", professionalController.handleGetProfessionalById);
professionalRoutes.post("/delete-professional", professionalController.handleDeleteProfessional);

export { professionalRoutes };
