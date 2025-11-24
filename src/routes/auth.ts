import express, { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const AuthRouter = express.Router()

const authController = new AuthController()

// AuthRouter.post("/register",authController.register)
AuthRouter.post("/register",(req,res)=>authController.register(req,res))




export default AuthRouter