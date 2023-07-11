import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { key ,applicant_Jwt_Key} from "src/config/jwt.config";
export class JwtStategy extends PassportStrategy(Strategy,'jwt'){
    constructor(

    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:key
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
