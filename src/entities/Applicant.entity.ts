import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./Job.entity";
import { EducationEntity } from "./Education.entity";
import { BaseEntity } from "./Base.entity";
import { ProjectsEntity } from "./Projects.entity";
import { WorkExperienceEntity } from "./WorkExperience.entity";

@Entity("Applicant")
export class ApplicantEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "applicantId",unique:true}) 
    applicantId :string;

    @Column("varchar", { name: "name"})
    name: string;

    @Column("varchar", { name: "email"})
    email: string;

    @Column("varchar", { name: "password" })
    password: string;

    @Column("varchar",{array:true ,name: "skills"})
    skills: string[];

    @Column("varchar", { name: "phone" })
    phone: string;

    @Column("varchar", { name: "address" })
    address: string;

    @OneToMany(() => JobEntity, (job) => job.jobId)
    jobs: JobEntity[];

    @OneToMany(() => EducationEntity, (education) => education.educationId)
    educations: EducationEntity[];

    @OneToMany(() => ProjectsEntity, (project) => project.projectId)
    projects: ProjectsEntity[];

    @OneToMany(()=>WorkExperienceEntity, (workExperience) => workExperience.workExperienceId)
    workExperiences: WorkExperienceEntity[];

}