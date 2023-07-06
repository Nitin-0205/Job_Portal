import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateWorkExpDto{
    @IsString()
    @ApiProperty()
    @IsOptional()
    company: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    location: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    position: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    from: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    to: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    current: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    
}