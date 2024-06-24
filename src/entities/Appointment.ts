import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointments",
}) 
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment: number;

    @Column()
    datea: string;

    @Column()
    hora: string;

    @Column({ default: "active" })
    status: string;
    
    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn()
    userId : number;
}
