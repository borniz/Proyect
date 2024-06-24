import { AppDataSource } from "../config/data-source";
import Icredentialdto from "../dto/credential.Dto";
import { Credential } from "../entities/Credential";
import credentialRepository from "../repositories/credential.Repository";



export const createCredentialsService = async (credentialDato: Icredentialdto):Promise<Credential>=> {
   
    const queryRunner = AppDataSource.createQueryRunner();
    queryRunner.connect();
    
    

    try {
        queryRunner.startTransaction();
        const newCredential = await credentialRepository.create(credentialDato)
        await credentialRepository.save(newCredential);
        return newCredential

    } catch (error) {
        throw Error("No se puede crear la credentials")
    }
}


export const validateCredential = async (validateCredentials: Icredentialdto):Promise<Credential>=> {
    const { username, password } = validateCredentials;
    const credential: Credential | null = await credentialRepository.findOneBy({ username })
    if (!credential) throw Error("Usuario inexistente")
    if (password != credential.password) throw Error("Contrasena incorrecta")
    return credential;
}