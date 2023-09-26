import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./Job.entity";
import { BaseEntity } from "./Base.entity";
import { Exclude } from "class-transformer";

@Entity("Employer")
export class EmployerEntity extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "employerId",unique:true}) 
    employerId :string;

    @Column("varchar", { name: "company",nullable:true})
    company: string;

    @OneToMany(() => JobEntity, (job) => job.employer)
    createdjobs: JobEntity[];
}