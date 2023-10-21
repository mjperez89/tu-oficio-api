import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import auth from "../../lib/auth";

const adminRoutes = Router();
const adminController  = new AdminController();

adminRoutes.get("/admin", auth.isLoggedIn, adminController.handleListAdmins);
adminRoutes.get("admin/add-admin", auth.isLoggedIn, (request, response) => {
    response.render("admin/addadmin")});
adminRoutes.post("/add-admin", auth.isLoggedIn, adminController.handleCreateAdmin);
adminRoutes.get("/searchAdmin", auth.isLoggedIn, adminController.handleSearchAdmin);
adminRoutes.post("/edit-admin", auth.isLoggedIn, adminController.handleUpdateAdmin);
adminRoutes.get("/editAdmin", auth.isLoggedIn, adminController.handleGetAdminData);
adminRoutes.post("/delete-admin", auth.isLoggedIn, adminController.handleDeleteAdmin);

export { adminRoutes };