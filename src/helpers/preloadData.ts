import { AppDataSource } from "../config/data-source"
import userRepository from "../repositories/user.Repository"
import { preDataAppointments } from "./preloadDateippointment"

const user1 = {
    id:1,
    name:"yarod",
    email: "yaro@outlook.es",
    birthdate: "15/02/1993 ",
    nDni: 1009950254,
    username: "yarod",
    password:"bonilla"
}

const user2 = {
    id:2,
    name:"yarod2",
    email: "yarod@outlook.es",
    birthdate: "12/08/2002 ",
    nDni: 1009950254,
    username: "harol",
    password:"ruiz"
}
export const loadData = async () => {

    await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
            const usersDB = await userRepository.find()
            if (usersDB.length > 0) {
                preDataAppointments();
                return console.log("Ya existen los Datos");
                
            }
            const newUser1= userRepository.create(user1)
            const newUser2 = userRepository.create(user2)
                
            await transactionalEntityManager.save(newUser1)
            await transactionalEntityManager.save(newUser2)
            console.log("Se precargaron los Datos de los usuarios");
            preDataAppointments();
        }
        
    )
}