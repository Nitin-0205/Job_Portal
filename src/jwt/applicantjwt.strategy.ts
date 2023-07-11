import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { key ,applicant_Jwt_Key} from "src/config/jwt.config";

export class JwtApplicantStategy extends PassportStrategy(Strategy,"applicantjwt"){
    constructor(

    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:applicant_Jwt_Key
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