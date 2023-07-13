import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv"

export class JwtApplicantStategy extends PassportStrategy(Strategy,"applicantjwt"){
    constructor(

    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:dotenv.config().parsed.JWT_SECRET
        })
    }

    async validate(payload:any){
        // const employer  = await this.employerRepo.findOne({where:{employerId:payload.employerId}})
        // if(!employer){
        //     return false
        // }
        console.log(payload)
        return true
    }

}