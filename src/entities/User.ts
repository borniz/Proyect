import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Credential } from "./Credential"

@Entity({
    name: "users"
})
    
export class User{
    @PrimaryGeneratedColumn()
    id_User: number

    @Column({
        length:100
    })
    name: string

    @Column()
    email: string

    @Column()
    birthdate: string

    @Column()
    nDni: number;

    @OneToMany(() => Appointment, (appointment) => appointment.userId)
    @JoinColumn()
    appointments: Appointment[];

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential;


}