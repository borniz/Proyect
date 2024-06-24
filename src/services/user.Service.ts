

import Iuserdto from "../dto/user.Dto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import IUser from "../interface/IUser";
import userRepository from "../repositories/user.Repository";
import { createCredentialsService } from "./credentials.Services";

let user: IUser[] = [];
export let id_User:number = 1;

export const createUserService = async (userDato: Iuserdto):Promise<User>=> {
    const newuser:User = await userRepository.create(userDato);
    await userRepository.save(newuser);
    
    const newCredential: Credential = await createCredentialsService({
       
        
        username: userDato.username,
        password: userDato.password
    })

    newuser.credential = newCredential;
    userRepository.save(newuser)
    
    return newuser
    
}

export const getUserIdService = async (id_User: number):Promise<User|null> => {
    const user = await userRepository.findOne({ where: { id_User }, relations: ['appointments'] })
   if(!user)throw Error("Usuario inexistente")
    return user;
}
export const postUserService = async ()=>{}
export const getUserService = async ():Promise<User[]> => {
    const users = await userRepository.find(
       { relations: {
           appointments: true,
           credential:true
        }}
    );
    return users;
 }

export const deleteUserService = async (id: number):Promise<void>=> {
    user = user.filter((user: IUser) => {
        return user.id_User !== id
    });

}
export const findUserByCrednetialId = async (credentialid: number): Promise<User | null> => {
    const user: User | null = await userRepository.findOneBy({ credential: { id: credentialid } })
    return user;
}