import express from "express";
import { Login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/logout").get(logout)

export default router;