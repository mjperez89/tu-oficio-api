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
            const admin=await this.adminService.create({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName

            });
            response.status(200).json(admin)

        } catch (err) {
            console.log("error cldo"+ err)

        }

    }
    
    async handleDeleteAdmin(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.adminService.delete(id).then(() => {
                response.redirect("/admins")
            });

        } catch (err) {
            response.redirect("/admins");

        }
    }
    
    async handleGetAdminData(request: Request, response: Response) {
        let { requestId } = request.query;
        const id = parseInt(requestId.toString());

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
                response.redirect("/admins")

            });
        } catch (err) {
            response.redirect("/admins");
        }

    }
}
export { AdminController };