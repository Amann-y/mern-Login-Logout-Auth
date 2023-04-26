import express from "express";
import { register, login, profile } from "../controller/userController.js";
import { auth } from "../authentication/auth.js";

const route = express.Router();

route.post("/register", register);

route.post("/login", login);

route.get("/profile", auth, profile);

export default route;
