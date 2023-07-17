import { JwtModuleOptions } from "@nestjs/jwt";
import * as dotenv from "dotenv"

export const JwtConfig: JwtModuleOptions = {
    signOptions: {
        expiresIn: "1d"
    }
}