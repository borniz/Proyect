import { Router } from "express";

import { createAppointment, getAppointments, getByIdAppointment, getappointmentcancel } from "../controllers/appointment.Controller";


const router: Router = Router();


router.get("/turns/:id",getByIdAppointment)   
router.get("/turns/cancel/:id",getappointmentcancel)   
router.put("/cancel/:id",getappointmentcancel)
router.post("/turns/schedule",createAppointment)
router.get("/turns",getAppointments)
export default router;