import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";
@Entity()
export class ProjectsEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })   
    id: number;

    @Column("varchar", { name: "projectId",unique:true}) //
    projectId :string;

    @Column("varchar", { name: "title" })
    title: string;

    @Column("varchar", { name: "description" })
    description: string;

    @Column("varchar", { name: "link"})
    link: string;

    @Column("varchar", { name: "from" })
    from: string;

    @Column("varchar", { name: "to"})
    to: string; 

    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.projects)
    applicant: ApplicantEntity;
}