import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";
import { error } from "console";
import { enhanceWithGeocoordinates, enhanceEntitiesWithGeocoordinates } from "../utils/GeocodingUtils";

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
        const { firstName, lastName, email, address, phoneNumber, birthDate, dni, password } = request.body;
        console.log(request.body);
        try {
            const newClient = await this.clientService.create({
                firstName,
                lastName,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                password
            });

            response.status(201).json({ 
                message: 'Registro exitoso',
                client: {
                    id: newClient.id,
                    email: newClient.email,
                    firstName: newClient.firstName,
                    lastName: newClient.lastName
                }
            });
        } catch (err) {
            console.error("Error creating client:", err);
            response.status(400).json({ 
                message: err.message || 'Error al crear el cliente'
            });
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
            const email = request.query.email.toString();
            console.log(email);

            const client = await this.clientService.getData(email);

            // Add geocoordinates to the client
            const enhancedClient = await enhanceWithGeocoordinates(client);

            response.status(200).json(enhancedClient)

        }
        catch (error) {
            response.status(400).send(error)
        }
    }

    async handleListClients(request: Request, response: Response) {

        try {
            const clients = await this.clientService.list();

            // Add geocoordinates to all clients
            const enhancedClients = await enhanceEntitiesWithGeocoordinates(clients);

            response.status(200).json(enhancedClients)
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

            // Add geocoordinates to all clients
            const enhancedClients = await enhanceEntitiesWithGeocoordinates(clients);

            response.status(200).json(enhancedClients)
        } catch (error) {
            response.status(400).send(error.toString())
        }
    }
    async handleUpdateClient(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password } = request.body;

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
                password
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
