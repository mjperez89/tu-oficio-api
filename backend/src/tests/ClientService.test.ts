import { getCustomRepository } from "typeorm";
import { ClientService } from "../services/ClientService";

jest.mock("typeorm", () => ({
  getCustomRepository: jest.fn(),
  EntityRepository: () => () => {},
  Repository: class {},
  Entity: () => () => {},
  PrimaryGeneratedColumn: () => () => {},
  Column: () => () => {},
}));

const mockRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
};

(getCustomRepository as jest.Mock).mockReturnValue(mockRepository);

const clientService = new ClientService();

const validClient = {
  firstName: "Juan",
  lastName: "Perez",
  age: 30,
  phoneNumber: 2615551234,
  email: "juan@test.com",
  address: "Mendoza",
  birthDate: new Date(1993, 5, 15),
  dni: 12345678,
  userName: "jperez",
};

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCustomRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe("create", () => {
    it("debe crear un cliente correctamente", async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(validClient);
      mockRepository.save.mockResolvedValue(validClient);

      const result = await clientService.create(validClient);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ dni: validClient.dni });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ email: validClient.email });
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(validClient);
    });

    it("debe lanzar error si faltan campos obligatorios", async () => {
      const incompleteClient = { ...validClient, firstName: "" };

      await expect(clientService.create(incompleteClient)).rejects.toThrow(
        "Por favor complete todos los datos."
      );
    });

    it("debe lanzar error si el DNI ya existe", async () => {
      mockRepository.findOne.mockResolvedValueOnce(validClient);

      await expect(clientService.create(validClient)).rejects.toThrow(
        "Cliente ya existe."
      );
    });

    it("debe lanzar error si el email ya existe", async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(validClient);

      await expect(clientService.create(validClient)).rejects.toThrow(
        "Email ya existe."
      );
    });
  });

  describe("delete", () => {
    it("debe eliminar un cliente por id", async () => {
      const mockExecute = jest.fn().mockResolvedValue({ affected: 1 });
      mockRepository.createQueryBuilder.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              execute: mockExecute,
            }),
          }),
        }),
      });

      const result = await clientService.delete(1);
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe("getData", () => {
    it("debe retornar un cliente por id", async () => {
      mockRepository.findOne.mockResolvedValue(validClient);

      const result = await clientService.getData(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(validClient);
    });

    it("debe retornar undefined si no existe", async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      const result = await clientService.getData(999);
      expect(result).toBeUndefined();
    });
  });

  describe("list", () => {
    it("debe retornar todos los clientes", async () => {
      mockRepository.find.mockResolvedValue([validClient]);

      const result = await clientService.list();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([validClient]);
    });

    it("debe retornar lista vacía si no hay clientes", async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await clientService.list();
      expect(result).toEqual([]);
    });
  });

  describe("search", () => {
    it("debe buscar clientes por término", async () => {
      const mockGetMany = jest.fn().mockResolvedValue([validClient]);
      mockRepository.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnValue({
          orWhere: jest.fn().mockReturnValue({
            orWhere: jest.fn().mockReturnValue({
              orWhere: jest.fn().mockReturnValue({
                orWhere: jest.fn().mockReturnValue({
                  orWhere: jest.fn().mockReturnValue({
                    orWhere: jest.fn().mockReturnValue({
                      getMany: mockGetMany,
                    }),
                  }),
                }),
              }),
            }),
          }),
        }),
      });

      const result = await clientService.search("Juan");
      expect(result).toEqual([validClient]);
    });

    it("debe lanzar error si el término de búsqueda está vacío", async () => {
      await expect(clientService.search("")).rejects.toThrow(
        "Por favor rellene todos los campos"
      );
    });
  });

  describe("update", () => {
    it("debe actualizar un cliente", async () => {
      const mockExecute = jest.fn().mockResolvedValue({ affected: 1 });
      mockRepository.createQueryBuilder.mockReturnValue({
        update: jest.fn().mockReturnValue({
          set: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              execute: mockExecute,
            }),
          }),
        }),
      });

      const result = await clientService.update({ ...validClient, id: 1 });
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });
});
