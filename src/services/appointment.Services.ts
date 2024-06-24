import { DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import IAppointmentdto from "../dto/appointment.Dto";
import { Appointment } from "../entities/Appointment";

import appointmentRepository from "../repositories/appointment.Repository";
import userRepository from "../repositories/user.Repository";
import { error } from "console";

export const createAppointmentServices = async (appointmentData: IAppointmentdto):Promise<Appointment|void>=> {

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
        queryRunner.startTransaction();
        const newAppointment = await appointmentRepository.create(appointmentData);
        await queryRunner.manager.save(newAppointment)
        
        const user = await userRepository.findById(appointmentData.userId)
      
            
        newAppointment.userId = user.id_User
        await queryRunner.manager.save(newAppointment)
        await queryRunner.commitTransaction();
        return newAppointment;
        
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw Error("Usuario no encontrado")
            
        } finally {
            await queryRunner.release();
        }
        
    }
    
    
export const getappointmentServices = async () => {

    const appointments = await appointmentRepository.find({
       
    });
    
    return appointments;
}
    

export const getByIdAppointmentServices = async (id_appointment: number) => {
    const appointment = await appointmentRepository.findOneBy({ id_appointment })
    if(!appointment)throw Error("El turno no fue encontrado")
    return appointment
}

export const getappointmentcancelServices = async (id_appointment: number) => {
    const appointment = await appointmentRepository.findOneBy({ id_appointment })
    if(!appointment)throw Error("El turno no fue encontrado")
    appointment.status = "Cancel"
    appointmentRepository.save(appointment)
    return appointment
}