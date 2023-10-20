import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

class ClientController {
    //instanciamos clientService global para todos los métodos
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
        this.handleCreateClient = this.handleCreateClient.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.handleGetClientData = this.handleGetClientData.bind(this);
        this.handleListClients = this.handleListClients.bind(this);
        this.handleSearchClient = this.handleSearchClient.bind(this);
        this.handleUpdateClient = this.handleUpdateClient.bind(this);
    }

    async handleCreateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName } = request.body;

        try {
            await this.clientService.create({
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
                request.flash("success", "Cliente creado con éxito")
                response.redirect("/clients")
            });

        } catch (err) {
            request.flash("error", "Error al crear el cliente", err.toString());
            console.log(request.body)
            response.redirect("/clients");

        }

    }

    async handleDeleteClient(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.clientService.delete(id).then(() => {
                request.flash("success", "Cliente eliminado con éxito")
                response.redirect("/clients")
            });

        } catch (err) {
            request.flash("error", "Error al eliminar el Cliente", err.toString());
            response.redirect("/clients");

        }
    }
    
    async handleGetClientData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const cliente = await this.clientService.getData(id);

        return response.render("clients/edit", {
            cliente: cliente
        });
    }
    async handleListClients(request: Request, response: Response) {

        const clients = await this.clientService.list();

        return response.render("clients/index", {
            clients: clients
        });
    }
    async handleSearchClient(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        try {
            const clients = await this.clientService.search(search);
            response.render("clients/search", {
                clients: clients,
                search: search
            });
        } catch (err) {
            request.flash("error", "Error al crear el cliente", err.toString());
            response.redirect("/clients");

        }
    }
    async handleUpdateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName } = request.body;


        try {
            await this.clientService.update({
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
                request.flash("success", "Cliente actualizado con éxito")
                response.redirect("/clients")

            });
        } catch (err) {
            request.flash("error", "Error al crear el cliente", err.toString());
            response.redirect("/clients");
        }

    }
}
export { ClientController };