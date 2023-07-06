import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./Job.entity";
import { BaseEntity } from "./Base.entity";

@Entity("Employer")
export class EmployerEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "employerId",unique:true}) 
    employerId :string;

    @Column("varchar", { name: "name"})
    name: string;

    @Column("varchar", { name: "email"})
    email: string;

    @Column("varchar", { name: "password" })
    password: string;

    @Column("varchar", { name: "phone" })
    phone: string;

    @Column("varchar", { name: "address" })
    address: string;

    @Column("varchar", { name: "company"})
    company: string;

    @OneToMany(() => JobEntity, (job) => job.employer)
    createdjobs: JobEntity[];
}