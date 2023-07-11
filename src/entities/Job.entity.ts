import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany, JoinTable } from "typeorm";
// import { EmployerEntity } from "./Employer.entity";
import { ApplicantEntity } from "./Applicant.entity";
import { EmployerEntity } from "./Employer.entity";

@Entity("Job")
export class JobEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "jobId",unique:true}) 
    jobId :string;

    @Column("varchar", { name: "JobTitle"})
    jobtitle: string;

    @Column("varchar", { name: "description"})
    description: string;

    @Column("int", { name: "salary" })
    salary: number;

    @Column("varchar", { name: "location"})
    location: string;

    @Column("varchar", { name: "company"})
    company: string;

    @Column("varchar", { name: "type"})
    type: string;

    @Column("varchar", { name: "status",default:"open"})
    status: string;
     
    @ManyToOne(() => EmployerEntity, (employer) => employer.createdjobs)
    employer: EmployerEntity;
    
    @ManyToMany(() => ApplicantEntity, (applicant) => applicant.appliedJobs)
    @JoinTable()
    applicant: ApplicantEntity[];

}