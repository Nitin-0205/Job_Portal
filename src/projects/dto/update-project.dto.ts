import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProjectDto{
    @IsOptional()
    @IsString()
    projectId: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    title: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    link: string;

    
    @IsString()
    @ApiProperty()
    @IsOptional()
    from: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    to: string;

}