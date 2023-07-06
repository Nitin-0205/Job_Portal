import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";
import { BaseEntity } from "./Base.entity";


@Entity()
export class WorkExperienceEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "workExperienceId",unique:true, length: 50 }) //
    workExperienceId :string;

    @Column("varchar", { name: "company"})
    company: string;

    @Column("varchar", { name: "position"})
    position: string;

    @Column("varchar", { name: "from"})
    from: string;

    @Column("varchar", { name: "to"})
    to: string;

    @Column("varchar", { name: "current"})
    current: string;

    @Column("varchar", { name: "description"})
    description: string;

    @Column("varchar", { name: "location"})
    location: string;


    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.workExperiences)
    applicant: ApplicantEntity;
}