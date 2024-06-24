import { Router } from "express";
import {  createUser, getUser, getUserId, login } from "../controllers/user.Controller";

import { createAppointment, getAppointments } from "../controllers/appointment.Controller";


const router: Router = Router();

router.post("/user/register", createUser)
router.post("/users/login",login)   
router.get("/User", getUser)
router.get("/user/:id",getUserId)

export default router;