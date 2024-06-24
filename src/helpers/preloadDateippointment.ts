import { AppDataSource} from "../config/data-source";
import { Appointment } from "../entities/Appointment";

import appointmentRepository from "../repositories/appointment.Repository";
import userRepository from "../repositories/user.Repository";

export const preDataAppointments = async () => {
    const preDataAppointment: Appointment[] = [
        {
            id_appointment: 1,
            datea: "07/13/1997",
            hora: "12hs",
            status: "active",
            userId: 1
        },
        {
            id_appointment: 2,
            datea: "07/13/1997",
            hora: "14 hs",
            status: "active",
            userId: 2
        }
    ];

  

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const promises =  preDataAppointment.map(async (appointment) => {
        
        const newAppointment = await appointmentRepository.create(appointment);
        const user = await userRepository.findOneBy({ id_User: appointment.userId });
        if (!user) {
            throw Error(`No se encontró el usuario con ID ${appointment.userId}`);
        }
        newAppointment.userId = user.id_User;
        queryRunner.manager.save(newAppointment);

    })
    try {
        await queryRunner.startTransaction();
        await Promise.all(promises)
        console.log("precarga de appointment realizada con exito");
        await queryRunner.commitTransaction();
    } catch (error) {
        console.log("error en la transsaccion");
        await queryRunner.rollbackTransaction();
        
    } finally {
        console.log("Ha finalizado el intento de precarga");
        await queryRunner.release();
        
    }
    
};
