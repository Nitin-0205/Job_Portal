import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";
@Entity()
export class ProjectsEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })   
    id: number;

    @Column("varchar", { name: "projectId",unique:true, length: 50 }) //
    projectId :string;

    @Column("varchar", { name: "title", length: 50 })
    title: string;

    @Column("varchar", { name: "description", length: 50 })
    description: string;

    @Column("varchar", { name: "link", length: 50 })
    link: string;

    @Column("varchar", { name: "from", length: 50 })
    from: string;

    @Column("varchar", { name: "to", length: 50 })
    to: string; 

    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.applicantId)
    applicant: ApplicantEntity;
}