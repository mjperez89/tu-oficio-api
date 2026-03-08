import { getCustomRepository } from "typeorm";
import { ProfessionalService } from "../services/ProfesionalService";

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

const professionalService = new ProfessionalService();

const validProfessional = {
  firstName: "Carlos",
  lastName: "Gomez",
  age: 40,
  phoneNumber: 2614567890,
  email: "carlos@test.com",
  address: "San Rafael",
  birthDate: new Date(1985, 3, 10),
  dni: 87654321,
  userName: "cgomez",
  registrationNumber: 12345,
  specialty: "Electricista",
  yearsOfExperience: 15,
};

describe("ProfessionalService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCustomRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe("create", () => {
    it("debe crear un profesional correctamente", async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(validProfessional);
      mockRepository.save.mockResolvedValue(validProfessional);

      const result = await professionalService.create(validProfessional);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ dni: validProfessional.dni });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ email: validProfessional.email });
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(validProfessional);
    });

    it("debe lanzar error si faltan campos obligatorios", async () => {
      const incomplete = { ...validProfessional, firstName: "" };

      await expect(professionalService.create(incomplete)).rejects.toThrow(
        "Por favor complete todos los datos."
      );
    });

    it("debe lanzar error si faltan campos profesionales", async () => {
      const incomplete = { ...validProfessional, specialty: "" };

      await expect(professionalService.create(incomplete)).rejects.toThrow(
        "Por favor complete todos los datos."
      );
    });

    it("debe lanzar error si el DNI ya existe", async () => {
      mockRepository.findOne.mockResolvedValueOnce(validProfessional);

      await expect(professionalService.create(validProfessional)).rejects.toThrow(
        "Profesional ya existe."
      );
    });

    it("debe lanzar error si el email ya existe", async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(validProfessional);

      await expect(professionalService.create(validProfessional)).rejects.toThrow(
        "Email ya existe."
      );
    });
  });

  describe("delete", () => {
    it("debe eliminar un profesional por id", async () => {
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

      const result = await professionalService.delete(1);
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe("getData", () => {
    it("debe retornar un profesional por id", async () => {
      mockRepository.findOne.mockResolvedValue(validProfessional);

      const result = await professionalService.getData(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(validProfessional);
    });

    it("debe retornar undefined si no existe", async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      const result = await professionalService.getData(999);
      expect(result).toBeUndefined();
    });
  });

  describe("list", () => {
    it("debe retornar todos los profesionales", async () => {
      mockRepository.find.mockResolvedValue([validProfessional]);

      const result = await professionalService.list();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([validProfessional]);
    });

    it("debe retornar lista vacía si no hay profesionales", async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await professionalService.list();
      expect(result).toEqual([]);
    });
  });

  describe("search", () => {
    it("debe buscar profesionales por término", async () => {
      const mockGetMany = jest.fn().mockResolvedValue([validProfessional]);
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

      const result = await professionalService.search("Carlos");
      expect(result).toEqual([validProfessional]);
    });

    it("debe lanzar error si el término de búsqueda está vacío", async () => {
      await expect(professionalService.search("")).rejects.toThrow(
        "Por favor rellene todos los campos"
      );
    });
  });

  describe("update", () => {
    it("debe actualizar un profesional", async () => {
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

      const result = await professionalService.update({ ...validProfessional, id: 1 });
      expect(mockExecute).toHaveBeenCalled();
      expect(result).toEqual({ affected: 1 });
    });
  });
});
