import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User).extend({
    findById: async function (id_User:number):Promise<User> {
        const user = await this.findOneBy({ id_User })
        if (user) return user
        else throw Error("Invalid ID")
    },
    
})

export default userRepository;