import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateApplicantDto } from "./create-applicant.dto";
import { Type } from "class-transformer";
export class WorkExpDto{
    @IsString()
    @IsOptional()
    @IsUUID()
    workExperienceId: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    company: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @IsString()
    @ApiProperty()
    position: string;

    @IsString()
    @ApiProperty()
    from: string;

    @IsString()
    @ApiProperty()
    to: string;

    @IsString()
    @ApiProperty()
    current: string;

    @IsString()
    @ApiProperty()
    description: string;

}