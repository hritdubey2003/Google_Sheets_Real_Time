import express from "express";
import { login, logout, register } from "../controller/Auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register" , register ); // This sub-routing is for registering a new client 
router.post('/login' , login ); // This sub-routing is for logging in
router.get("/logout" , authMiddleware , logout );
export default router;