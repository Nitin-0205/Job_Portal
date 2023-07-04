import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./Job.entity";
import { BaseEntity } from "./Base.entity";

@Entity("Employer")
export class EmployerEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "employerId",unique:true, length: 50 }) 
    employerId :string;

    @Column("varchar", { name: "name", length: 50 })
    name: string;

    @Column("varchar", { name: "companyName", length: 50 })
    email: string;

    @Column("varchar", { name: "email", length: 50 })
    password: string;

    @Column("varchar", { name: "role", length: 50 })
    phone: string;

    @Column("varchar", { name: "address" })
    address: string;

    @Column("varchar", { name: "company", length: 50 })
    company: string;

    @Column("varchar", { name: "type", length: 50 })
    type: string;

    @OneToMany(() => JobEntity, (job) => job.jobId)
    createdjobs: JobEntity[];
}