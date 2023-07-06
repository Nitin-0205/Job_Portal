import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class EducationDto{
    @IsString()
    @IsOptional()
    educationId: string;

    @IsString()
    @ApiProperty()
    school: string;

    @IsString()
    @ApiProperty()
    degree: string;

    @IsString()
    @ApiProperty()
    fieldofstudy: string;

    @IsString()
    @ApiProperty()
    from: string;
    
    @IsString()
    @ApiProperty()
    to: string;

    @IsString()
    @ApiProperty()
    current: string;

}