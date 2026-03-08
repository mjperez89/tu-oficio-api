import * as supertest from "supertest"

const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
}

jest.mock("typeorm", () => ({
    getCustomRepository: jest.fn(() => mockRepository),
    EntityRepository: () => () => {},
    Repository: class {},
    Entity: () => () => {},
    PrimaryGeneratedColumn: () => () => {},
    Column: () => () => {},
    DataSource: jest.fn().mockImplementation(() => ({
        initialize: jest.fn(),
    })),
}))

import { app } from "../../server"

describe("E2E - Registro de usuarios", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const { getCustomRepository } = require("typeorm")
        ;(getCustomRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    describe("POST /add-client", () => {
        const validClient = {
            firstName: "Juan",
            lastName: "Perez",
            age: 30,
            phoneNumber: 2615551234,
            email: "juan@test.com",
            address: "Mendoza",
            birthDate: "1993-06-15",
            dni: 12345678,
            userName: "jperez",
        }

        it("debe registrar un cliente y devolver 201", async () => {
            mockRepository.findOne.mockResolvedValue(null)
            mockRepository.create.mockReturnValue(validClient)
            mockRepository.save.mockResolvedValue({ ...validClient, id: 1 })

            const response = await supertest(app)
                .post("/add-client")
                .send(validClient)
                .expect(201)

            expect(response.body.message).toBe("Cliente registrado correctamente.")
            expect(response.body.client).toBeDefined()
        })

        it("debe devolver 400 si faltan campos", async () => {
            const response = await supertest(app)
                .post("/add-client")
                .send({ firstName: "Juan" })
                .expect(400)

            expect(response.body.message).toBe("Por favor complete todos los datos.")
        })

        it("debe devolver 400 si el DNI ya existe", async () => {
            mockRepository.findOne.mockResolvedValueOnce(validClient)

            const response = await supertest(app)
                .post("/add-client")
                .send(validClient)
                .expect(400)

            expect(response.body.message).toBe("Cliente ya existe.")
        })

        it("debe devolver 400 si el email ya existe", async () => {
            mockRepository.findOne
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce(validClient)

            const response = await supertest(app)
                .post("/add-client")
                .send(validClient)
                .expect(400)

            expect(response.body.message).toBe("Email ya existe.")
        })
    })

    describe("POST /add-professional", () => {
        const validProfessional = {
            firstName: "Carlos",
            lastName: "Gomez",
            age: 40,
            phoneNumber: 2614567890,
            email: "carlos@test.com",
            address: "San Rafael",
            birthDate: "1985-04-10",
            dni: 87654321,
            userName: "cgomez",
            registrationNumber: 12345,
            specialty: "Electricista",
            yearsOfExperience: 15,
        }

        it("debe registrar un profesional y devolver 201", async () => {
            mockRepository.findOne.mockResolvedValue(null)
            mockRepository.create.mockReturnValue(validProfessional)
            mockRepository.save.mockResolvedValue({ ...validProfessional, id: 1 })

            const response = await supertest(app)
                .post("/add-professional")
                .send(validProfessional)
                .expect(201)

            expect(response.body.message).toBe("Profesional registrado correctamente.")
            expect(response.body.professional).toBeDefined()
        })

        it("debe devolver 400 si faltan campos profesionales", async () => {
            const incomplete = { ...validProfessional, specialty: "" }

            const response = await supertest(app)
                .post("/add-professional")
                .send(incomplete)
                .expect(400)

            expect(response.body.message).toBe("Por favor complete todos los datos.")
        })

        it("debe devolver 400 si el DNI ya existe", async () => {
            mockRepository.findOne.mockResolvedValueOnce(validProfessional)

            const response = await supertest(app)
                .post("/add-professional")
                .send(validProfessional)
                .expect(400)

            expect(response.body.message).toBe("Profesional ya existe.")
        })
    })
})
