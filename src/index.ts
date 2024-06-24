import "reflect-metadata"
import { AppDataSource } from "./config/data-source"
import express from "./server";
import { PORT } from "./config/envs";
import { loadData } from "./helpers/preloadData";
import { preDataAppointments } from "./helpers/preloadDateippointment";



const initializeApp =async () => { 
    await AppDataSource.initialize();
    await loadData();
    await preDataAppointments();
    express.listen(PORT, () => { 
        console.log(`Server listening on ${PORT}`);
        
    })
}
initializeApp();