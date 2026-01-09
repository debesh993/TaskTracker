import express from "express";
import { login, logout, signup, verifyAuth } from "../controllers/authcontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);          
router.post("/login", login);             
router.post("/logout", logout);           
router.get("/verify", authMiddleware, verifyAuth); 

export default router;
