import { DataSource } from "typeorm";
import { User } from "../entities/User";
import {Appointment} from "../entities/Appointment";
import { DB_HOST, DB_PORT, DB_TYPE, DB_USERNAME } from "./envs";
import { Credential } from "../entities/Credential";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: "Raqueta1997",
    database: DB_TYPE,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User,Appointment,Credential],
    subscribers: [],
    migrations: [],
})

