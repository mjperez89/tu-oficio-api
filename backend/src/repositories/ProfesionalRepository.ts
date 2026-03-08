import { EntityRepository, Repository } from "typeorm";
import { Profesional } from "../entities/Profesional";

@EntityRepository(Profesional)
class ProfesionalRepository extends Repository<Profesional> { }
export { ProfesionalRepository };