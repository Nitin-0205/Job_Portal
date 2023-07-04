import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany, JoinTable } from "typeorm";
// import { EmployerEntity } from "./Employer.entity";
import { ApplicantEntity } from "./Applicant.entity";

@Entity("Job")
export class JobEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "jobId",unique:true, length: 50 }) 
    jobId :string;

    @Column("varchar", { name: "JobTitle", length: 50 })
    jobtitle: string;

    @Column("varchar", { name: "description", length: 500 })
    description: string;

    @Column("int", { name: "salary" })
    salary: number;

    @Column("varchar", { name: "location", length: 50 })
    location: string;

    @Column("varchar", { name: "company", length: 50 })
    company: string;

    @Column("varchar", { name: "type", length: 50 })
    type: string;
     
    // @ManyToOne(() => EmployerEntity, (employer) => employer.employerId)
    // employer: EmployerEntity;
    
    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.applicantId)
    applicant: ApplicantEntity;

}