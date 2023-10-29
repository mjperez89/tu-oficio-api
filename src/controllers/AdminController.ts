import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";
import { error } from "console";

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
            console.log("error cldo "+ err)
            response.status(400).send("" + err)

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
        try{
            const requestId = request.query.id.toString();
            console.log(requestId);
            const id = parseInt(requestId,10);
    
    
            const admin = await this.adminService.getData(id);

            response.status(200).json(admin)
    
        }
        catch(error){
            response.status(400).send(error)
        }
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


        const requestId = request.query.id.toString();
        console.log(requestId);
        const id = parseInt(requestId,10);
        try {
            const admin= await this.adminService.update({
                id,
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
            response.status(200).send( "Admin con id "+ id.toString() + " actualizado con exito")
        } catch (err) {
            response.status(400).send(err.toString());
        }

    }
}
export { AdminController };