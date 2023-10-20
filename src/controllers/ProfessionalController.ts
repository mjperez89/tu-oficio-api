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
            await this.professionalService.create({
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
                request.flash("success", "Profesional creado con éxito")
                response.redirect("/professionals")
            });

        } catch (err) {
            request.flash("error", "Error al crear el profesional", err.toString());
            console.log(request.body)
            response.redirect("/professionals");

        }

    }

    async handleDeleteProfessional(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.professionalService.delete(id).then(() => {
                request.flash("success", "Profesional eliminado con éxito")
                response.redirect("/professionals")
            });

        } catch (err) {
            request.flash("error", "Error al eliminar el Profesional", err.toString());
            response.redirect("/professionals");

        }
    }

    async handleGetProfessionalData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

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
            request.flash("error", "Error al crear el profesional", err.toString());
            response.redirect("/professionals");

        }
    }
    async handleUpdateProfessional(request: Request, response: Response) {
        const { firstName, lastName, age, phoneNumber, email, address, birthDate, dni, userName, registrationNumber, specialty, yearsOfExperience } = request.body;

        try {
            await this.professionalService.update({
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
                request.flash("success", "Profesional actualizado con éxito")
                response.redirect("/professionals")

            });
        } catch (err) {
            request.flash("error", "Error al crear el profesional", err.toString());
            response.redirect("/professionals");
        }

    }
}
export { ProfessionalController };