import express, { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { UserService } from "../services/UserService.js";
import { AppDataSource } from "../config/data-source.js";
import { User } from "../entity/User.js";

const AuthRouter = express.Router()

const userRepository = AppDataSource.getRepository(User)

const userService = new UserService(userRepository)

const authController = new AuthController(userService)

// AuthRouter.post("/register",authController.register)
AuthRouter.post("/register", (req, res) => authController.register(req, res))




export default AuthRouter