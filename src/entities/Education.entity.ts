import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";

@Entity()
export class EducationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "educationId",unique:true, length: 50 }) //
    educationId :string;

    @Column("varchar", { name: "school", length: 50 })
    school: string;

    @Column("varchar", { name: "degree", length: 50 })
    degree: string;

    @Column("varchar", { name: "fieldofstudy", length: 50 })
    fieldofstudy: string;

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
