import { JwtModuleOptions } from "@nestjs/jwt";

const key = "sigma_007_secret"
export const JwtConfig: JwtModuleOptions = {
    secret: key,
    signOptions: {
        expiresIn: "1d"
    }
}