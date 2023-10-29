import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import auth from "../../lib/auth";

const adminRoutes = Router();
const adminController  = new AdminController();

adminRoutes.get("/list-admins", adminController.handleListAdmins);
adminRoutes.post("/add-admin", adminController.handleCreateAdmin);
adminRoutes.get("/searchAdmin", adminController.handleSearchAdmin);
adminRoutes.post("/edit-admin", adminController.handleUpdateAdmin);
adminRoutes.get("/editAdmin", adminController.handleGetAdminData);
adminRoutes.post("/delete-admin", adminController.handleDeleteAdmin);

export { adminRoutes };