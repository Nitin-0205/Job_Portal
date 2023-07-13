import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";


@Injectable()
export class ProjectDto {
    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional()
    @IsString()
    projectId: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    link: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    from: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    to: string;


}