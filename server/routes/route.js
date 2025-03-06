import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import upload from "../Middleware/CluodUpload.js";
import {
  Like,
  Messages,
  Profile,
  ProfileID,
  Profiles,
} from "../contrllers/ActionController.js";
import { Login, Register } from "../contrllers/UserController.js";

const routes = express.Router();

routes.post("/register", upload.single("image"), Register);
routes.post("/login", Login);
routes.post("/message", Messages);
routes.get("/profiles/:id", ProfileID);
routes.get("/profiles", Profiles);
routes.post("/like", Like);

routes.get("/profile", authMiddleware, Profile);

export default routes;
