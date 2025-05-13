import { Request, Response } from "express";
import { ProfessionalService } from "../services/ProfessionalService";
import { enhanceWithGeocoordinates, enhanceEntitiesWithGeocoordinates } from "../utils/GeocodingUtils";

class ProfessionalController {
    //instanciamos professionalService global para todos los métodos
    private professionalService: ProfessionalService;

    constructor() {
        this.professionalService = new ProfessionalService();
        this.handleLoginProfessional = this.handleLoginProfessional.bind(this);
        this.handleCreateProfessional = this.handleCreateProfessional.bind(this);
        this.handleDeleteProfessional = this.handleDeleteProfessional.bind(this);
        this.handleGetProfessionalData = this.handleGetProfessionalData.bind(this);
        this.handleListProfessionals = this.handleListProfessionals.bind(this);
        this.handleSearchProfessional = this.handleSearchProfessional.bind(this);
        this.handleUpdateProfessional = this.handleUpdateProfessional.bind(this);
        this.handleGetProfessionalById = this.handleGetProfessionalById.bind(this);
    }

    async handleCreateProfessional(request: Request, response: Response) {
        const { firstName, lastName, email, address, phoneNumber, birthDate, dni, registrationNumber, specialty, password } = request.body;

        try {
            await this.professionalService.create({
                firstName,
                lastName,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                password,
                registrationNumber,
                specialty

            })
            response.status(201).json({ message: 'Registro exitoso' })
            console.log("Profesional registrado con éxito.")

        } catch (err) {
            console.log(err.toString())
            response.status(400).json({ message: err.toString() })
        }

    }

    async handleDeleteProfessional(request: Request, response: Response) {
        const requestId = request.query.id.toString();
        const id = parseInt(requestId, 10);

        try {
            await this.professionalService.delete(id)
            response.status(200).send("Profesional con id: " + id + " eliminado")

        } catch (err) {
            console.log("error delete prof " + err);
            response.status(400).send(err.toString());
        }
    }

    async handleGetProfessionalData(request: Request, response: Response) {
        try {
            const email = request.query.email.toString();
            console.log(email);

            const professional = await this.professionalService.getData(email);

            // Add geocoordinates to the professional
            const enhancedProfessional = await enhanceWithGeocoordinates(professional);

            response.status(200).json(enhancedProfessional)
        }
        catch (error) {
            response.status(400).send(error)
        }
    }

    async handleListProfessionals(request: Request, response: Response) {
        try {
            const professionals = await this.professionalService.list();

            // Add geocoordinates to all professionals
            const enhancedProfessionals = await enhanceEntitiesWithGeocoordinates(professionals);

            response.status(200).json(enhancedProfessionals)
        } catch (error) {
            response.status(404).send(error.toString())
        }
    }

    async handleSearchProfessional(request: Request, response: Response) {
        const {
            firstName,
            lastName,
            age,
            phoneNumber,
            email,
            address,
            dni,
            userName,
            registrationNumber,
            specialty,
            yearsOfExperience
        } = request.query;

        const searchParams = {
            firstName: String(firstName),
            lastName: String(lastName),
            age: String(age),
            phoneNumber: String(phoneNumber),
            email: String(email),
            address: String(address),
            dni: String(dni),
            userName: String(userName),
            registrationNumber: String(registrationNumber),
            specialty: String(specialty),
            yearsOfExperience: String(yearsOfExperience)
        };

        try {
            const professionals = await this.professionalService.search(searchParams);

            // Add geocoordinates to all professionals
            const enhancedProfessionals = await enhanceEntitiesWithGeocoordinates(professionals);

            response.status(200).json(enhancedProfessionals)
        } catch (error) {
            response.status(400).send(error.toString())
        }
    }
    async handleUpdateProfessional(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, password, registrationNumber, specialty, yearsOfExperience } = request.body;

        // const requestId = request.params.id.toString();
        // console.log(requestId);
        const id = parseInt(request.params.id, 10);

        if (isNaN(id)) {
            return response.status(400).send("ID inválido");
        }

        try {
            const professional = await this.professionalService.update({
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
                registrationNumber,
                specialty,
                yearsOfExperience
            });
            response.status(200).send("Profesional con id " + id.toString() + " actualizado con éxito");
        } catch (err) {
            console.log("error update prof " + err)
            response.status(400).send(err.toString());
        }

    }

    async handleLoginProfessional(request: Request, response: Response) {
        console.log(request.body)
        try {
            const { email, password } = request.body;

            const professional = await this.professionalService.getProfessionalLogin(email, password);

            response.status(200).json({ message: 'Inicio de sesión exitoso' })

        }
        catch (error) {
            console.log(error)
            response.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }

    async handleGetProfessionalById(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id, 10);

            if (isNaN(id)) {
                return response.status(400).json({ message: 'ID inválido' });
            }

            const professional = await this.professionalService.getById(id);

            // Add geocoordinates to the professional
            const enhancedProfessional = await enhanceWithGeocoordinates(professional);

            response.status(200).json(enhancedProfessional);
        } catch (error) {
            console.log(error);
            response.status(404).json({ message: error.toString() });
        }
    }
}
export { ProfessionalController };
