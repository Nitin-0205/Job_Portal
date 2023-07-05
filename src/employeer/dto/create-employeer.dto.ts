import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateEmployeerDto {

    @IsString()
    @ApiProperty()
    @IsOptional()
    employerId :string;

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
    @IsNotEmpty()
    @ApiProperty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    company: string;

}
