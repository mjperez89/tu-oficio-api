import { AppDataSource } from "./data-source"
import { User } from "./entities/User"
import { app } from "./server"
import { seed } from "./seed"
import {Role} from "./entities/Role";

AppDataSource.initialize().then(async () => {
    const userRepository = AppDataSource.getRepository(User)

    // Crear usuarios de ejemplo si la tabla está vacía
    const count = await userRepository.count()
    if (count === 0) {
        console.log("La base de datos está vacía, ejecutando seed...")
        await seed()
    //     agregamos admins por defecto
        console.log("Creando usuarios de ejemplo...")

        await userRepository.save([
            {
                firstName: "Martin", lastName: "Perez", age: 34,
                phoneNumber: 2615153207, email: "admin@tuoficio.com", password: "admin123",
                address: "Coquimbito, Maipu", birthDate: new Date(1989, 1, 17),
                dni: 34256729, userName: "jmperez", role: Role.ADMIN
            },
            {
                firstName: "Juan", lastName: "Avila", age: 45,
                phoneNumber: 2614567890, email: "juan@tuoficio.com", password: "admin123",
                address: "Mendoza Centro", birthDate: new Date(1981, 5, 10),
                dni: 28627255, userName: "javila", role: Role.ADMIN
            },
            {
                firstName: "Luis", lastName: "Mamani", age: 22,
                phoneNumber: 2617891234, email: "luis@tuoficio.com", password: "admin123",
                address: "San Rafael", birthDate: new Date(1985, 3, 20),
                dni: 30567890, userName: "lmamani", role: Role.ADMIN
            }
        ])

        // await userRepository.save([admin1, admin2, admin3])
        console.log("Usuarios manuales creados: admin1, admin2, admin3")
    } else {
        console.log(`La base de datos ya tiene ${count} usuarios. No se necesita el seed.`)
    }

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000")
    })

}).catch(error => console.log(error))
