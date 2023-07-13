import { JwtModuleOptions } from "@nestjs/jwt";
import * as dotenv from "dotenv"
// export const key = "sigma_007_employer"
// export const applicant_Jwt_Key = "sigma_007_applicant"


export const JwtConfig: JwtModuleOptions = {
    secret: dotenv.config().parsed.JWT_SECRET,
    signOptions: {
        expiresIn: "1d"
    }
}