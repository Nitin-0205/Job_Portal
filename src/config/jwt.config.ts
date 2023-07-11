import { JwtModuleOptions } from "@nestjs/jwt";

export const key = "sigma_007_employer"
export const applicant_Jwt_Key = "sigma_007_applicant"

export const JwtConfig: JwtModuleOptions = {
    secret: key,
    signOptions: {
        expiresIn: "1d"
    }
}