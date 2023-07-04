import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateApplicantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString() 
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsArray()
    @ApiProperty()
    skills: [];
}
