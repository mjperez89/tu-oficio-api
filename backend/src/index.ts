import { AppDataSource } from "./data-source"
import { User } from "./entities/User"
import { Role } from "./entities/Role"
import { app } from "./server"

AppDataSource.initialize().then(async () => {
    const userRepository = AppDataSource.getRepository(User)

    // Crear usuarios de ejemplo si la tabla está vacía
    const count = await userRepository.count()
    if (count === 0) {
        console.log("Creando usuarios de ejemplo...")

        const admin = userRepository.create({
            firstName: "Martin", lastName: "Perez", age: 34,
            phoneNumber: 2615153207, email: "admin@tuoficio.com", password: "admin123",
            address: "Coquimbito, Maipu", birthDate: new Date(1989, 1, 17),
            dni: 34256729, userName: "jmperez", role: Role.ADMIN
        })

        const client = userRepository.create({
            firstName: "Juan", lastName: "Garcia", age: 28,
            phoneNumber: 2614567890, email: "juan@test.com", password: "cliente123",
            address: "Mendoza Centro", birthDate: new Date(1997, 5, 10),
            dni: 40123456, userName: "jgarcia", role: Role.CLIENT
        })

        const professional = userRepository.create({
            firstName: "Carlos", lastName: "Gomez", age: 40,
            phoneNumber: 2617891234, email: "carlos@test.com", password: "prof123",
            address: "San Rafael", birthDate: new Date(1985, 3, 20),
            dni: 30567890, userName: "cgomez", role: Role.PROFESSIONAL
        })

        await userRepository.save([admin, client, professional])
        console.log("Usuarios creados: admin, cliente, profesional")
    } else {
        console.log(`Base de datos ya tiene ${count} usuarios.`)
    }

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000")
    })

}).catch(error => console.log(error))
