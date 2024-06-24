import { Request, Response } from "express";
import { createAppointmentServices, getByIdAppointmentServices, getappointmentServices, getappointmentcancelServices } from "../services/appointment.Services";
import { Appointment } from "../entities/Appointment";
import { getRepository } from "typeorm";
import { id_User } from "../services/user.Service";

export const createAppointment = async (req: Request, res: Response) => {
    try {
        
        const { datea,hora,status, userId } = req.body;
        const newappointment = await createAppointmentServices({ datea, hora,status,userId});
        res.status(200).json(newappointment);
    } catch (error) {
        res.status(400).json({error:"Error al crear el turno"})
    }
};


export const getAppointments = async (req: Request, res: Response) => { 
    try {
        
        const appointments = await getappointmentServices();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({error:"No se puede visualizar los turnos"})
    }
};

export const getByIdAppointment = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params
        const newAppointment: Appointment |null= await getByIdAppointmentServices(Number( id ))
        console.log(`el id que se recive es ${id}`);
        
        res.status(200).json(newAppointment)
    } catch (error:any) {
        res.status(404).json({error:error.message})
    }
}

export const getappointmentcancel = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params;
        const appointment = await getappointmentcancelServices(Number(id))
        res.status(200).json({
            message: "El turno fue  cancelado",
            appointment
        })
    } catch (error:any) {
        res.status(404).json({error:error.message})
    }

}