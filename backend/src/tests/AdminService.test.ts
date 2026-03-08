import { getCustomRepository } from "typeorm";
import { AdminService } from "../services/AdminService";

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

const adminService = new AdminService();

const validAdmin = {
  firstName: "Ana",
  lastName: "Lopez",
  age: 35,
  phoneNumber: 2617891234,
  email: "ana@test.com",
  address: "Godoy Cruz",
  birthDate: new Date(1990, 8, 20),
  dni: 33445566,
  userName: "alopez",
};

describe("AdminService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCustomRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe("create", () => {
    it("debe crear un admin correctamente", async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(validAdmin);
      mockRepository.save.mockResolvedValue(validAdmin);

      const result = await adminService.create(validAdmin);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ dni: validAdmin.dni });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ email: validAdmin.email });
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(validAdmin);
    });

    it("debe lanzar error si faltan campos obligatorios", async () => {
      const incomplete = { ...validAdmin, firstName: "" };

      await expect(adminService.create(incomplete)).rejects.toThrow(
        "Por favor complete todos los datos."
      );
    });

    it("debe lanzar error si el DNI ya existe", async () => {
      mockRepository.findOne.mockResolvedValueOnce(validAdmin);

      await expect(adminService.create(validAdmin)).rejects.toThrow(
        "Admin ya existe."
      );
    });

    it("debe lanzar error si el email ya existe", async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(validAdmin);

      await expect(adminService.create(validAdmin)).rejects.toThrow(
        "Email ya existe."
      );
    });
  });

  describe("delete", () => {
    it("debe eliminar un admin por id", async () => {
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

      const result = await adminService.delete(1);
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe("getData", () => {
    it("debe retornar un admin por id", async () => {
      mockRepository.findOne.mockResolvedValue(validAdmin);

      const result = await adminService.getData(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(validAdmin);
    });

    it("debe retornar undefined si no existe", async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      const result = await adminService.getData(999);
      expect(result).toBeUndefined();
    });
  });

  describe("list", () => {
    it("debe retornar todos los admins", async () => {
      mockRepository.find.mockResolvedValue([validAdmin]);

      const result = await adminService.list();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([validAdmin]);
    });

    it("debe retornar lista vacía si no hay admins", async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await adminService.list();
      expect(result).toEqual([]);
    });
  });

  describe("search", () => {
    it("debe buscar admins por término", async () => {
      const mockGetMany = jest.fn().mockResolvedValue([validAdmin]);
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

      const result = await adminService.search("Ana");
      expect(result).toEqual([validAdmin]);
    });

    it("debe lanzar error si el término de búsqueda está vacío", async () => {
      await expect(adminService.search("")).rejects.toThrow(
        "Por favor rellene todos los campos"
      );
    });
  });

  describe("update", () => {
    it("debe actualizar un admin", async () => {
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

      const result = await adminService.update({ ...validAdmin, id: 1 });
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });
});
