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

const mockQueryBuilder = (results: any[]) => ({
    where: jest.fn().mockReturnValue({
        orWhere: jest.fn().mockReturnValue({
            orWhere: jest.fn().mockReturnValue({
                orWhere: jest.fn().mockReturnValue({
                    orWhere: jest.fn().mockReturnValue({
                        orWhere: jest.fn().mockReturnValue({
                            orWhere: jest.fn().mockReturnValue({
                                getMany: jest.fn().mockResolvedValue(results),
                            }),
                        }),
                    }),
                }),
            }),
        }),
    }),
})

describe("E2E - Login de usuarios", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const { getCustomRepository } = require("typeorm")
        ;(getCustomRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    describe("POST /login-client", () => {
        const existingClient = {
            id: 1,
            firstName: "Juan",
            lastName: "Perez",
            email: "juan@test.com",
            dni: 12345678,
        }

        it("debe hacer login exitoso de un cliente", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([existingClient])
            )

            const response = await supertest(app)
                .post("/login-client")
                .send({ email: "juan@test.com", password: "123456" })
                .expect(200)

            expect(response.body.message).toBe("Inicio de sesión exitoso.")
            expect(response.body.client).toEqual(existingClient)
        })

        it("debe devolver 404 si el cliente no existe", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([])
            )

            const response = await supertest(app)
                .post("/login-client")
                .send({ email: "noexiste@test.com", password: "123456" })
                .expect(404)

            expect(response.body.message).toBe("Cliente no encontrado.")
        })

        it("debe devolver 400 si no se envia email", async () => {
            const response = await supertest(app)
                .post("/login-client")
                .send({ password: "123456" })
                .expect(400)

            expect(response.body.message).toBe("Por favor ingrese su email.")
        })
    })

    describe("POST /login-professional", () => {
        const existingProfessional = {
            id: 1,
            firstName: "Carlos",
            lastName: "Gomez",
            email: "carlos@test.com",
            specialty: "Electricista",
        }

        it("debe hacer login exitoso de un profesional", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([existingProfessional])
            )

            const response = await supertest(app)
                .post("/login-professional")
                .send({ email: "carlos@test.com", password: "123456" })
                .expect(200)

            expect(response.body.message).toBe("Inicio de sesión exitoso.")
            expect(response.body.professional).toEqual(existingProfessional)
        })

        it("debe devolver 404 si el profesional no existe", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([])
            )

            const response = await supertest(app)
                .post("/login-professional")
                .send({ email: "noexiste@test.com", password: "123456" })
                .expect(404)

            expect(response.body.message).toBe("Profesional no encontrado.")
        })

        it("debe devolver 400 si no se envia email", async () => {
            const response = await supertest(app)
                .post("/login-professional")
                .send({ password: "123456" })
                .expect(400)

            expect(response.body.message).toBe("Por favor ingrese su email.")
        })
    })
})
