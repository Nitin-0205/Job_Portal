import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeerDto } from './create-employeer.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeerDto{
    @IsString()
    @IsOptional()
    @ApiProperty()
    name:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    password:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    company:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    location:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone:string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address:string;
    
}
