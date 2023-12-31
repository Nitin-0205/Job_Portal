import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
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
    @ApiProperty({enum: ["employer", "applicant"]})
    role: string;
}