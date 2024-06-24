import Express from "express"; 
import router from "./routers";
import cors from "cors";
const express = Express();

express.use(cors())
express.use(Express.json())
express.use(router)
export default express;