
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    userId :string;

    // BeforeInsert(){
    //     this.userId = uuidv4();
    // }

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
    role: string;

}
