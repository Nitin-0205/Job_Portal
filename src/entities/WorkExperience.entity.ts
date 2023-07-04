import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";
import { BaseEntity } from "./Base.entity";


@Entity()
export class WorkExperienceEntity extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "workExperienceId",unique:true, length: 50 }) //
    workExperienceId :string;

    @Column("varchar", { name: "company", length: 50 })
    company: string;

    @Column("varchar", { name: "location", length: 50 })
    location: string;

    @Column("varchar", { name: "from", length: 50 })
    from: string;

    @Column("varchar", { name: "to", length: 50 })
    to: string;

    @Column("varchar", { name: "current", length: 50 })
    current: string;

    @Column("varchar", { name: "description", length: 50 })
    description: string;

    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.applicantId)
    applicant: ApplicantEntity;
}