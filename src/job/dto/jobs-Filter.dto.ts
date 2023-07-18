import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class JobsFilterDto{

    @IsOptional()
    @ApiProperty({required:false})
    limit :number;

    @IsOptional()
    @ApiProperty({required:false})
    offset :number;

    @IsOptional()
    @ApiProperty({required:false})
    jobId :string;

    @ApiProperty({required:false})
    @IsOptional()
    jobtitle: string;

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    description: string;

    @ApiProperty({required:false})
    @IsOptional()
    salary: number;

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    location: string;

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    company: string;

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    type: string;

}