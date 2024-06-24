import { Request, Response } from "express"
import { createUserService, deleteUserService, findUserByCrednetialId, getUserIdService, getUserService } from "../services/user.Service";
import { User } from "../entities/User";
import Iuserdto from "../dto/user.Dto";
import { validateCredential } from "../services/credentials.Services";
import userRepository from "../repositories/user.Repository";
import { isErrored } from "stream";



export const createUser = async (req: Request, res:Response)=> { 

    try {

        const { name, email, birthdate, nDni, username, password }: Iuserdto = req.body
        if(![name, email, birthdate, nDni, username, password])throw Error("Faltan datos")
        const newUser:User=await createUserService({ name, email, birthdate, nDni, username, password })
    res.status(200).json(newUser);
        
    } catch (error: any) {
       res.status(400).json({error: error.message})
    }
}


export const getUserId = async (req: Request, res: Response) => { 
    try {
        
        const { id } = req.params;
        const UserId:User|null= await getUserIdService(Number(id));
        res.status(200).json(UserId)
    } catch (error:any) {
        res.status(404).json({error:"ID Incorrecto"})
    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        
        const users: User[] = await getUserService();
        const response = {users,/*credential,appointments*/}
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:"No se pueden ver los usuarios"})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.body;
        await deleteUserService(id)
        res.status(200).json({message:"Se ha eliminado exitosamente"})
    } catch (error) {
        res.status(400).json({error:"No se pudo eliminar el Usuario"})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const credential = await validateCredential({ username, password })
        const user =await findUserByCrednetialId(credential.id)
        res.status(200).json({
            login: true,
            user
        })

    } catch (error:any) {
        res.status(400).json({login:false,error: error.message})
    }
}