import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";
import { error } from "console";

class AdminController {
    //instanciamos adminService global para todos los métodos
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
        this.handleLoginAdmin = this.handleLoginAdmin.bind(this);
        this.handleCreateAdmin = this.handleCreateAdmin.bind(this);
        this.handleDeleteAdmin = this.handleDeleteAdmin.bind(this);
        this.handleGetAdminData = this.handleGetAdminData.bind(this);
        this.handleListAdmins = this.handleListAdmins.bind(this);
        this.handleSearchAdmin = this.handleSearchAdmin.bind(this);
        this.handleUpdateAdmin = this.handleUpdateAdmin.bind(this);
    }

    async handleCreateAdmin(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl } = request.body;

        try {
            const admin = await this.adminService.create({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName,
                password, 
                profilePhotoUrl
            });
            response.status(200).json(admin)

        } catch (err) {
            console.log("error cldo " + err)
            response.status(400).send("" + err)

        }

    }

    async handleDeleteAdmin(request: Request, response: Response) {
        const requestId = request.query.id.toString();
        const id = parseInt(requestId, 10);

        try {
            await this.adminService.delete(id)
            response.status(200).send("Admin con id: " + id + " eliminado")

        } catch (error) {
            response.status(400).send(error.toString())
        }
    }

    async handleGetAdminData(request: Request, response: Response) {
        try {
            const requestId = request.query.id.toString();
            console.log(requestId);
            const id = parseInt(requestId, 10);


            const admin = await this.adminService.getData(id);

            response.status(200).json(admin)

        }
        catch (error) {
            response.status(400).send(error)
        }
    }

    async handleListAdmins(request: Request, response: Response) {

        try {
            const admins = await this.adminService.list();

            response.status(200).json(admins)
        } catch (error) {
            response.status(404).send(error.toString())
        }
    }
    async handleSearchAdmin(request: Request, response: Response) {
        const { firstName, lastName, age, dni, email, userName, phoneNumber, address } = request.query;
        const searchParams = {
            firstName: String(firstName),
            lastName: String(lastName),
            age: String(age),
            dni: String(dni),
            email: String(email),
            userName: String(userName),
            phoneNumber: String(phoneNumber),
            address: String(address)
        };

        try {
            const admins = await this.adminService.search(searchParams);
            response.status(200).json(admins)
        } catch (error) {
            response.status(400).send(error.toString())
        }
    }
    async handleUpdateAdmin(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl} = request.body;

        const requestId = request.query.id.toString();
        console.log(requestId);
        const id = parseInt(requestId, 10);
        try {
            const admin = await this.adminService.update({
                id,
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName,
                password,
                profilePhotoUrl
            });
            response.status(200).send("Admin con id " + id.toString() + " actualizado con exito")
        } catch (err) {
            response.status(400).send(err.toString());
        }

    }
    
    async handleLoginAdmin(request: Request, response: Response) {
        console.log(request.body)
        try {
            const { email, password } = request.body;

            const admin = await this.adminService.getAdminLogin(email,password);

            response.status(200).json({ message: 'Inicio de sesión exitoso' })

        }
        catch (error) {
            console.log(error)
            response.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }
}
export { AdminController };