import type { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import type { UserData } from "../types/index.js";

export class UserService {
    constructor(private userRespository:Repository<User>){}
    async create( {firstName , lastName , email , password }:UserData){
          // Step 3: User repository lo (database table ka access)
        // const userRespository = AppDataSource.getRepository(User);

        // Step 4: User ko database mein save karo
        await this.userRespository.save({ firstName, lastName, email, password });
    }
}