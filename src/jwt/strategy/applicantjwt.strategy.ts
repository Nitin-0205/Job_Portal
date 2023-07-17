import { HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";

export class JwtApplicantStategy extends PassportStrategy(Strategy,'applicantjwt'){
    constructor(
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_ApplicantSECRET
        })
    }

    async validate(payload:any){
        console.log(payload)
        if(!payload){
            throw new HttpException("Invalid Token Access to this Applicant Service",HttpStatus.UNAUTHORIZED)
        }
        return true
    }

}
