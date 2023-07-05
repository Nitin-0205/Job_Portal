import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";


export class JwtStategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            // secretOrKey:process.env.JWT_SECRET

            
        })
    }

    async validate(payload:any){
        return true
    }

}