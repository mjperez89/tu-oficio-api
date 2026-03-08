import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../entities/Admin";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> { }
export { AdminRepository };