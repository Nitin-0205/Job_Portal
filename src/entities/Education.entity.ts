import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "./Applicant.entity";

@Entity()
export class EducationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "educationId",unique:true}) //
    educationId :string;

    @Column("varchar", { name: "school" })
    school: string;

    @Column("varchar", { name: "degree"})
    degree: string;

    @Column("varchar", { name: "fieldofstudy" })
    fieldofstudy: string;

    @Column("varchar", { name: "from" })
    from: string;

    @Column("varchar", { name: "to"})
    to: string;

    @Column("varchar", { name: "current"})
    current: string;


    @ManyToOne(() => ApplicantEntity, (applicant) => applicant.educations)
    applicant: ApplicantEntity;
    
}
