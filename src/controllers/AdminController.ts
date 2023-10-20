import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

class AdminController {
    //instanciamos adminService global para todos los métodos
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
        this.handleCreateAdmin = this.handleCreateAdmin.bind(this);
        this.handleDeleteAdmin = this.handleDeleteAdmin.bind(this);
        this.handleGetAdminData = this.handleGetAdminData.bind(this);
        this.handleListAdmins = this.handleListAdmins.bind(this);
        this.handleSearchAdmin = this.handleSearchAdmin.bind(this);
        this.handleUpdateAdmin = this.handleUpdateAdmin.bind(this);
    }

    async handleCreateAdmin(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName } = request.body;

        try {
            await this.adminService.create({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName

            }).then(() => {
                request.flash("success", "Admin creado con éxito")
                response.redirect("/admins")
            });

        } catch (err) {
            request.flash("error", "Error al crear el admin", err.toString());
            console.log(request.body)
            response.redirect("/admins");

        }

    }
    
    async handleDeleteAdmin(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.adminService.delete(id).then(() => {
                request.flash("success", "Admin eliminado con éxito")
                response.redirect("/admins")
            });

        } catch (err) {
            request.flash("error", "Error al eliminar el Admin", err.toString());
            response.redirect("/admins");

        }
    }
    
    async handleGetAdminData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const admin = await this.adminService.getData(id);

        return response.render("admins/edit", {
            admin: admin
        });
    }
    async handleListAdmins(request: Request, response: Response) {

        const admins = await this.adminService.list();

        return response.render("admin/index", {
            admins: admins
        });
    }
    async handleSearchAdmin(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        try {
            const admins = await this.adminService.search(search);
            response.render("admin/search", {
                admins: admins,
                search: search
            });
        } catch (err) {
            request.flash("error", "Error al crear el admin", err.toString());
            response.redirect("/admins");

        }
    }
    async handleUpdateAdmin(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName } = request.body;


        try {
            await this.adminService.update({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName
            }).then(() => {
                request.flash("success", "Admin actualizado con éxito")
                response.redirect("/admins")

            });
        } catch (err) {
            request.flash("error", "Error al crear el admin", err.toString());
            response.redirect("/admins");
        }

    }
}
export { AdminController };