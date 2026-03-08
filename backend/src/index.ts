import { AppDataSource } from "./data-source"
import { ProfesionsEnum } from "./entities/ProfesionsEnum"
import { User } from "./entities/User"
import { app } from "./server"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User("Martin","Perez",34,2615153207,"jonathanmartinperez1989@gmail.com","Coquimbito, Maipu",new Date(1989,1,17),34256729,"jmperez",ProfesionsEnum.Admin)
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000")
    })

}).catch(error => console.log(error))
