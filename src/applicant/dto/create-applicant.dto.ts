import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateApplicantDto  {

    @IsString()
    @IsOptional()
    @IsUUID()
    applicantId: string;

    // @IsArray()
    @ApiProperty()
    @IsOptional()   
    skills: string[];

    @IsString()
    @IsOptional()   
    file : string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty()
    // name: string;

    // @IsString() 
    // @IsNotEmpty()
    // @ApiProperty()
    // email: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty()
    // password: string;

    // @IsString()
    // @ApiProperty()
    // phone: string;

    // @IsString()
    // @ApiProperty()
    // address: string;

    // @ApiProperty()
    // @Type(() => WorkExpDto)
    // @ValidateNested()
    // workExperience: WorkExpDto
}
