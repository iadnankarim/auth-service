import type { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";
import type { RegisterRequest } from "../types/index.js";
import { UserService } from "../services/UserService.js";
import type { Logger } from "winston";

// User data ka structure define kiya

export class AuthController {
  userService = UserService;

  constructor(userService: UserService, private logger:Logger) {
    this.userService = userService;
  }
  async register(req: RegisterRequest, res: Response, next: NextFunction ) {

    // Step 2: Body se data destructure karo
    const { firstName, lastName, email, password } = req.body;

    this.logger.debug("New request to register a user",{
        firstName , lastName , email , password:"*****"
    })

    try {
      // await this.userService.create({firstName , lastName , email , password})

      // User create karo aur result lo
      const user = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
      });

      this.logger.info("user has been created register", {id:user.id})

       // Step 5: 201 Created response bhejo
      // res.status(201).json();
      res.status(201).json({ id: user.id });
    } catch (error) {

      next(error);
    }
  }
}
