import type { Request } from "express";

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Request type extend kiya - ab req.body strictly typed hai
export interface RegisterRequest extends Request {
    body: UserData;
}