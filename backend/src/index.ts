import * as express from "express"
import * as cors from "cors"
import * as path from "path"
import { AppDataSource } from "./data-source"
import { ProfesionsEnum } from "./entities/ProfesionsEnum"
import { User } from "./entities/User"

const app = express()
app.use(cors())
app.use(express.json())

// Servir frontend buildeado en producción
const frontendBuildPath = path.join(__dirname, "../../frontend/build")
app.use(express.static(frontendBuildPath))

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User("Martin","Perez",34,2615153207,"jonathanmartinperez1989@gmail.com","Coquimbito, Maipu",new Date(1989,1,17),34256729,"jmperez",ProfesionsEnum.Admin)
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    // Cualquier ruta que no sea API, servir el index.html de React
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendBuildPath, "index.html"))
    })

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000")
    })

}).catch(error => console.log(error))
