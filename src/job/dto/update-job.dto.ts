import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto extends PartialType(CreateJobDto) {

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
