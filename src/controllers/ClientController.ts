import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";
import { error } from "console";

class ClientController {
    //instanciamos clientService global para todos los métodos
    private clientService: ClientService;

    constructor() {
        this.clientService = new ClientService();
        this.handleLoginClient = this.handleLoginClient.bind(this);
        this.handleCreateClient = this.handleCreateClient.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.handleGetClientData = this.handleGetClientData.bind(this);
        this.handleListClients = this.handleListClients.bind(this);
        this.handleSearchClient = this.handleSearchClient.bind(this);
        this.handleUpdateClient = this.handleUpdateClient.bind(this);
    }

    async handleCreateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl } = request.body;

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
                userName,
                password,
                profilePhotoUrl
            });
            response.status(200).json(client)

        } catch (err) {
            console.log("error cldo " + err)
            response.status(400).send("" + err)

        }

    }

    async handleDeleteClient(request: Request, response: Response) {
        const requestId = request.query.id.toString();
        const id = parseInt(requestId, 10);

        try {
            await this.clientService.delete(id)
            response.status(200).send("Cliente con id: " + id + " eliminado")

        } catch (err) {
            response.status(400).send(error.toString())
        }
    }

    async handleGetClientData(request: Request, response: Response) {
        try {
            const requestId = request.query.id.toString();
            console.log(requestId);
            const id = parseInt(requestId, 10);


            const admin = await this.clientService.getData(id);

            response.status(200).json(admin)

        }
        catch (error) {
            response.status(400).send(error)
        }
    }

    async handleListClients(request: Request, response: Response) {

        try {
            const admins = await this.clientService.list();

            response.status(200).json(admins)
        } catch (error) {
            response.status(404).send(error.toString())
        }
    }
    async handleSearchClient(request: Request, response: Response) {
        const { firstName, lastName, age, dni, email, userName, password, phoneNumber, address } = request.query;
        const searchParams = {
            firstName: String(firstName),
            lastName: String(lastName),
            age: String(age),
            dni: String(dni),
            email: String(email),
            userName: String(userName),
            password: String(password),
            phoneNumber: String(phoneNumber),
            address: String(address)
        };

        try {
            const clients = await this.clientService.search(searchParams);
            response.status(200).json(clients)
        } catch (error) {
            response.status(400).send(error.toString())
        }
    }
    async handleUpdateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, profilePhotoUrl } = request.body;

        const requestId = request.query.id.toString();
        console.log(requestId);
        const id = parseInt(requestId, 10);
        try {
            const admin = await this.clientService.update({
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
            response.status(200).send("Cliente con id " + id.toString() + " actualizado con exito")
        } catch (err) {
            response.status(400).send(err.toString());
        }

    }
    async handleLoginClient(request: Request, response: Response) {
        console.log(request.body)
        try {
            const { email, password } = request.body;

            const client = await this.clientService.getClientLogin(email, password);

            response.status(200).json({ message: 'Inicio de sesión exitoso' })

        }
        catch (error) {
            console.log(error)
            response.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }
}
export { ClientController };