import { EntityRepository, Repository } from "typeorm";
import { Professional } from "../entities/Professional";

@EntityRepository(Professional)
class ProfessionalRepository extends Repository<Professional> { }
export { ProfessionalRepository };