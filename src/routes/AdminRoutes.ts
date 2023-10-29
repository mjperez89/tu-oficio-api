import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import auth from "../../lib/auth";

const adminRoutes = Router();
const adminController  = new AdminController();

adminRoutes.get("/admin", auth.isLoggedIn, adminController.handleListAdmins);
adminRoutes.post("/add-admin", adminController.handleCreateAdmin);
adminRoutes.get("/searchAdmin", auth.isLoggedIn, adminController.handleSearchAdmin);
adminRoutes.post("/edit-admin", adminController.handleUpdateAdmin);
adminRoutes.get("/editAdmin", adminController.handleGetAdminData);
adminRoutes.post("/delete-admin", adminController.handleDeleteAdmin);

export { adminRoutes };