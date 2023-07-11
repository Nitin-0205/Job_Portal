import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateEducationDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    school: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    degree: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    fieldofstudy: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    from: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    to: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    current: string;

}