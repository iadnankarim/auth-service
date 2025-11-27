import type { Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import type { RegisterRequest } from "../types/index.js";
import { UserService } from "../services/UserService.js";

// User data ka structure define kiya

export class AuthController {

    userService= UserService

    constructor(userService : UserService){
        this.userService = userService
    }
    async register(req: RegisterRequest, res: Response) {
        // console.log(req.body)
         // Step 2: Body se data destructure karo
        const { firstName, lastName, email, password } = req.body;

    await this.userService.create({firstName , lastName , email , password})

        // Step 5: 201 Created response bhejo
        res.status(201).json();
    }
}
