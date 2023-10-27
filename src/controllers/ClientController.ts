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
            const client = await this.clientService.create({
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
                response.status(200).json(client)
            });

        } catch (err) {
            console.log("error creando client "+ err)
            response.status(400).send("" + err)

        }

    }

    async handleDeleteClient(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.clientService.delete(id).then(() => {
                response.redirect("/clients")
            });

        } catch (err) {
            console.log("error delete client "+ err)
            response.status(400).send("" + err)
        }
    }
    
    async handleGetClientData(request: Request, response: Response) {
        let { requestId } = request.query;
        const id = parseInt(requestId.toString());

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
            console.log("error search client"+ err)
            response.status(400).send("" + err)

        }
    }
    async handleUpdateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName } = request.body;


        try {
            const client = await this.clientService.update({
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
                response.status(200).json(client)
            });
        } catch (err) {
            console.log("error update client "+ err)
            response.status(400).send("" + err)
        }

    }
}
export { ClientController };