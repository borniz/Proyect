import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";

const appointmentRepository = AppDataSource.getRepository(Appointment).extend({
    findById: async function (id_appointment: number):Promise<Appointment> {
       
        const appointments = await this.findOneBy({ id_appointment })
        if (appointments) return appointments
        else throw Error("Invalid ID")
    }
})
export default appointmentRepository;