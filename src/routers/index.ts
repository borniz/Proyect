import { Router } from "express";
import userRouter from "./userRouter"
import appointmentRouter from "./appointmentRouter"

const router: Router = Router();


router.use("/", userRouter)

router.use("/",appointmentRouter)
export default router;