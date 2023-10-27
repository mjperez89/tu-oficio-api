import { Request, Response } from "express";
import { ProfessionalService } from "../services/ProfessionalService";

class ProfessionalController {
    //instanciamos professionalService global para todos los métodos
    private professionalService: ProfessionalService;

    constructor() {
        this.professionalService = new ProfessionalService();
        this.handleCreateProfessional = this.handleCreateProfessional.bind(this);
        this.handleDeleteProfessional = this.handleDeleteProfessional.bind(this);
        this.handleGetProfessionalData = this.handleGetProfessionalData.bind(this);
        this.handleListProfessionals = this.handleListProfessionals.bind(this);
        this.handleSearchProfessional = this.handleSearchProfessional.bind(this);
        this.handleUpdateProfessional = this.handleUpdateProfessional.bind(this);
    }

    async handleCreateProfessional(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, registrationNumber, specialty, yearsOfExperience } = request.body;

        try {
            const professional = await this.professionalService.create({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName,
                registrationNumber,
                specialty,
                yearsOfExperience

            }).then(() => {
                response.status(200).json(professional)
            });

        } catch (err) {
            console.log("error creando prof "+ err)
            response.status(400).send("" + err)
        }

    }

    async handleDeleteProfessional(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.professionalService.delete(id).then(() => {
                response.redirect("/professionals")
            });

        } catch (err) {
            console.log("error delete prof "+ err)
            response.status(400).send("" + err)
        }
    }

    async handleGetProfessionalData(request: Request, response: Response) {
        let { requestId } = request.query;
        const id = parseInt(requestId.toString());

        const profesional = await this.professionalService.getData(id);

        return response.render("professionals/edit", {
            profesional: profesional
        });
    }
    async handleListProfessionals(request: Request, response: Response) {

        const professionals = await this.professionalService.list();

        return response.render("professionals/index", {
            professionals: professionals
        });
    }
    async handleSearchProfessional(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        try {
            const professionals = await this.professionalService.search(search);
            response.render("professionals/search", {
                professionals: professionals,
                search: search
            });
        } catch (err) {
            console.log("error search prof"+ err)
            response.status(400).send("" + err)
        }
    }
    async handleUpdateProfessional(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, registrationNumber, specialty, yearsOfExperience } = request.body;

        try {
            const professional = await this.professionalService.update({
                firstName,
                lastName,
                age,
                phoneNumber,
                email,
                address,
                birthDate,
                dni,
                userName,
                registrationNumber,
                specialty,
                yearsOfExperience
            }).then(() => {
                response.status(200).json(professional)
            });
        } catch (err) {
            console.log("error update prof "+ err)
            response.status(400).send("" + err)
        }

    }
}
export { ProfessionalController };