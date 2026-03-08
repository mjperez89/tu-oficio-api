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

describe("E2E - Búsqueda de profesionales", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const { getCustomRepository } = require("typeorm")
        ;(getCustomRepository as jest.Mock).mockReturnValue(mockRepository)
    })

    describe("GET /search", () => {
        const professionals = [
            {
                id: 1,
                firstName: "Carlos",
                lastName: "Gomez",
                email: "carlos@test.com",
                specialty: "Electricista",
            },
            {
                id: 2,
                firstName: "Ana",
                lastName: "Martinez",
                email: "ana@test.com",
                specialty: "Electricista",
            },
        ]

        it("debe retornar profesionales que coincidan con la búsqueda", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder(professionals)
            )

            const response = await supertest(app)
                .get("/search?q=Electricista")
                .expect(200)

            expect(response.body.results).toEqual(professionals)
            expect(response.body.results).toHaveLength(2)
        })

        it("debe retornar lista vacía si no hay coincidencias", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([])
            )

            const response = await supertest(app)
                .get("/search?q=Astronauta")
                .expect(200)

            expect(response.body.results).toEqual([])
            expect(response.body.results).toHaveLength(0)
        })

        it("debe devolver 400 si no se envía término de búsqueda", async () => {
            const response = await supertest(app)
                .get("/search")
                .expect(400)

            expect(response.body.message).toBe("Por favor ingrese un término de búsqueda.")
        })

        it("debe buscar por nombre del profesional", async () => {
            mockRepository.createQueryBuilder.mockReturnValue(
                mockQueryBuilder([professionals[0]])
            )

            const response = await supertest(app)
                .get("/search?q=Carlos")
                .expect(200)

            expect(response.body.results).toHaveLength(1)
            expect(response.body.results[0].firstName).toBe("Carlos")
        })
    })
})
