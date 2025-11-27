import type { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import type { UserData } from "../types/index.js";
import createHttpError from "http-errors";

export class UserService {
  constructor(private userRespository: Repository<User>) {}
  async create({ firstName, lastName, email, password }: UserData) {
    try {
      // Step 3: User repository lo (database table ka access)
      // const userRespository = AppDataSource.getRepository(User);

      // Step 4: User ko database mein save karo
      return await this.userRespository.save({
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err) {
      const error = createHttpError(
        500,
        "Failed to store the data in the database ",
      );

      throw error;
    }
  }
}
