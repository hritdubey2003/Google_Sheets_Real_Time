import express from "express";
import { register } from "../controller/Auth.controller";
const router = express.Router();

router.post("/register" , register ); // This sub-routing is for registering a new client 

export default router;