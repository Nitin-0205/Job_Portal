import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
    @IsString()
    @IsOptional()
    jobId :string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    jobtitle: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    salary: number;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    location: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    company: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    type: string;
     
}
