import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class JobsFilterDto{

    @IsString()
    @IsOptional()
    jobId :string;

    @IsString()
    @ApiProperty()
    @IsOptional()

    jobtitle: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    @IsNumber()
    @ApiProperty()
    @IsOptional()
    salary: number;

    @IsString()
    @ApiProperty()
    @IsOptional()
    location: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    company: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;

}