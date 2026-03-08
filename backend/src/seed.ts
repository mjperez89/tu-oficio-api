import { AppDataSource } from "./data-source"
import { User } from "./entities/User"
import { Role } from "./entities/Role"

const clients = [
    { firstName: "Laura",     lastName: "Martinez",  age: 25, phoneNumber: 2615551234, email: "laura@test.com",      password: "cliente123", address: "Godoy Cruz, Mendoza",  birthDate: new Date("1999-03-15"), dni: 45123456, userName: "lmartinez" },
    { firstName: "Sofia",     lastName: "Rodriguez", age: 30, phoneNumber: 2615552345, email: "sofia@test.com",      password: "cliente123", address: "Capital, Mendoza",     birthDate: new Date("1994-07-22"), dni: 38234567, userName: "srodriguez" },
    { firstName: "Diego",     lastName: "Fernandez", age: 28, phoneNumber: 2615553456, email: "diego@test.com",      password: "cliente123", address: "Maipu, Mendoza",       birthDate: new Date("1996-11-10"), dni: 41345678, userName: "dfernandez" },
    { firstName: "Valentina", lastName: "Gomez",     age: 22, phoneNumber: 2615554567, email: "valentina@test.com",  password: "cliente123", address: "Lujan, Mendoza",       birthDate: new Date("2002-04-05"), dni: 47456789, userName: "vgomez" },
    { firstName: "Facundo",   lastName: "Lopez",     age: 33, phoneNumber: 2615555678, email: "facundo@test.com",    password: "cliente123", address: "Las Heras, Mendoza",   birthDate: new Date("1991-09-18"), dni: 36567890, userName: "flopez" },
    { firstName: "Camila",    lastName: "Torres",    age: 27, phoneNumber: 2615556789, email: "camila@test.com",     password: "cliente123", address: "Guaymallen, Mendoza",  birthDate: new Date("1997-12-30"), dni: 43678901, userName: "ctorres" },
    { firstName: "Matias",    lastName: "Sanchez",   age: 31, phoneNumber: 2615557890, email: "matias@test.com",     password: "cliente123", address: "San Martin, Mendoza",  birthDate: new Date("1993-06-14"), dni: 37789012, userName: "msanchez" },
    { firstName: "Florencia", lastName: "Perez",     age: 24, phoneNumber: 2615558901, email: "florencia@test.com",  password: "cliente123", address: "Rivadavia, Mendoza",   birthDate: new Date("2000-02-28"), dni: 46890123, userName: "fperez" },
    { firstName: "Agustin",   lastName: "Diaz",      age: 29, phoneNumber: 2615559012, email: "agustin@test.com",    password: "cliente123", address: "Junin, Mendoza",       birthDate: new Date("1995-08-03"), dni: 39901234, userName: "adiaz" },
    { firstName: "Micaela",   lastName: "Ruiz",      age: 26, phoneNumber: 2615550123, email: "micaela@test.com",    password: "cliente123", address: "Tunuyan, Mendoza",     birthDate: new Date("1998-05-17"), dni: 44012345, userName: "mruiz" },
]

const professionals = [
    { firstName: "Pedro",     lastName: "Lopez",   age: 35, phoneNumber: 2614789012, email: "pedro@test.com",     password: "prof123", address: "Las Heras, Mendoza",  birthDate: new Date("1990-07-20"), dni: 32567890, userName: "plopez",   specialty: "Plomero",      yearsOfExperience: 10 },
    { firstName: "Roberto",   lastName: "Silva",   age: 42, phoneNumber: 2614780123, email: "roberto@test.com",   password: "prof123", address: "Maipu, Mendoza",      birthDate: new Date("1983-02-11"), dni: 28678901, userName: "rsilva",   specialty: "Electricista", yearsOfExperience: 18 },
    { firstName: "Marcelo",   lastName: "Herrera", age: 38, phoneNumber: 2614771234, email: "marcelo@test.com",   password: "prof123", address: "Guaymallen, Mendoza", birthDate: new Date("1987-05-25"), dni: 31789012, userName: "mherrera", specialty: "Carpintero",   yearsOfExperience: 14 },
    { firstName: "Daniel",    lastName: "Castro",  age: 45, phoneNumber: 2614762345, email: "daniel@test.com",    password: "prof123", address: "Capital, Mendoza",    birthDate: new Date("1980-10-08"), dni: 25890123, userName: "dcastro",  specialty: "Albanil",      yearsOfExperience: 20 },
    { firstName: "Lucas",     lastName: "Morales", age: 32, phoneNumber: 2614753456, email: "lucas@test.com",     password: "prof123", address: "Rivadavia, Mendoza",  birthDate: new Date("1993-01-17"), dni: 37901234, userName: "lmorales", specialty: "Jardinero",    yearsOfExperience: 8  },
    { firstName: "Nicolas",   lastName: "Vargas",  age: 40, phoneNumber: 2614744567, email: "nicolas@test.com",   password: "prof123", address: "San Martin, Mendoza", birthDate: new Date("1985-08-30"), dni: 30012345, userName: "nvargas",  specialty: "Gasista",      yearsOfExperience: 16 },
    { firstName: "Gustavo",   lastName: "Reyes",   age: 36, phoneNumber: 2614735678, email: "gustavo@test.com",   password: "prof123", address: "Junin, Mendoza",      birthDate: new Date("1989-04-12"), dni: 33123456, userName: "greyes",   specialty: "Pintor",       yearsOfExperience: 12 },
    { firstName: "Adrian",    lastName: "Flores",  age: 44, phoneNumber: 2614726789, email: "adrian@test.com",    password: "prof123", address: "Lujan, Mendoza",      birthDate: new Date("1981-11-03"), dni: 27234567, userName: "aflores",  specialty: "Cerrajero",    yearsOfExperience: 19 },
    { firstName: "Sergio",    lastName: "Romero",  age: 37, phoneNumber: 2614717890, email: "sergio@test.com",    password: "prof123", address: "Tunuyan, Mendoza",    birthDate: new Date("1988-06-22"), dni: 32345678, userName: "sromero",  specialty: "Soldador",     yearsOfExperience: 13 },
    { firstName: "Alejandro", lastName: "Mendez",  age: 41, phoneNumber: 2614708901, email: "alejandro@test.com", password: "prof123", address: "Godoy Cruz, Mendoza", birthDate: new Date("1984-09-14"), dni: 29456789, userName: "amendez",  specialty: "Electricista", yearsOfExperience: 17 },
]

async function seed() {
    await AppDataSource.initialize()
    const userRepository = AppDataSource.getRepository(User)

    console.log("Limpiando datos de prueba anteriores...")
    await userRepository.delete({ role: Role.CLIENT })
    await userRepository.delete({ role: Role.PROFESSIONAL })

    console.log("Creando 10 clientes...")
    for (const data of clients) {
        const existing = await userRepository.findOne({ where: { dni: data.dni } })
        if (!existing) {
            await userRepository.save(userRepository.create({ ...data, role: Role.CLIENT }))
            console.log(`  ✓ ${data.firstName} ${data.lastName}`)
        } else {
            console.log(`  - ${data.firstName} ${data.lastName} ya existe, omitiendo`)
        }
    }

    console.log("Creando 10 profesionales...")
    for (const data of professionals) {
        const existing = await userRepository.findOne({ where: { dni: data.dni } })
        if (!existing) {
            await userRepository.save(userRepository.create({ ...data, role: Role.PROFESSIONAL }))
            console.log(`  ✓ ${data.firstName} ${data.lastName} (${data.specialty})`)
        } else {
            console.log(`  - ${data.firstName} ${data.lastName} ya existe, omitiendo`)
        }
    }

    console.log("\nSeed completado.")
    await AppDataSource.destroy()
}

seed().catch(error => {
    console.error("Error en seed:", error)
    process.exit(1)
})
