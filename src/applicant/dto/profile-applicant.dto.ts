import { Type } from "class-transformer";
import { CreateApplicantDto } from "./create-applicant.dto";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { EducationDto } from "src/education/dto/education-applicant.dto";
import { WorkExpDto } from "src/work-experience/dto/work-experience.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectDto } from "src/projects/dto/projects.dto";

export class ProfileApplicantDto{

    @ApiProperty()
    @IsOptional()
    @Type(() => CreateApplicantDto)
    @ValidateNested()
    applicant: CreateApplicantDto;

    @ApiProperty()
    @IsOptional()
    @Type(() => EducationDto)
    @ValidateNested()
    education: EducationDto;

    @ApiProperty()
    @IsOptional()
    @Type(() => WorkExpDto)
    @ValidateNested()
    workExperience: WorkExpDto;

    @ApiProperty()
    @IsOptional()
    @Type(() => ProjectDto)
    @ValidateNested()
    projects: ProjectDto;
}