import { AppDataSource } from "./data-source"
import { Admin } from "./entities/Admin"
import { Professional } from "./entities/Professional"
import { RolesEnum } from "./entities/RolesEnum"
import { User } from "./entities/User"

AppDataSource.initialize().then(async () => {

    
    console.log("Inserting a new admin into the database...")
    const admin = new Admin(
        "Martin",
        "Perez",
        34,
        2615153207,
        "jonathanmartinperez1989@gmail.com",
        "Coquimbito, Maipu",
        new Date(1989, 1, 17),
        34256729,
        "jmperez",
        RolesEnum.ADMIN
    );
    await AppDataSource.manager.save(admin)
    console.log("Saved a new admin with id: " + admin.id)

    console.log("Loading users from the database...")
    const admins = await AppDataSource.manager.find(Admin)
    console.log("Loaded admins: ", admin)
    
    console.log("Inserting a new professional into the database...")
    const professional = new Professional(
        "Juan Pablo",
        "Avila",
        42,
        2616373600,
        "avilajuanp@gmail.com",
        "Godoy Cruz, Mendoza",
        new Date(1981, 2, 16),
        28627255,
        "avilajuanp",
        RolesEnum.PROFESSIONAL,
        340027,
        "electricista",
        15        
    );
    await AppDataSource.manager.save(professional)
    console.log("Saved a new professional with id: " + professional.id)

    console.log("Loading professional from the database...")
    const professionals = await AppDataSource.manager.find(Professional)
    console.log("Loaded professionals: ", professionals)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
