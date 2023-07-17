import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv"
import { HttpException, HttpStatus } from "@nestjs/common";
// import { UserService } from "src/user/user.service";


export class JwtStategy extends PassportStrategy(Strategy,'empjwt'){
    constructor( 
        // private readonly userService:UserService
            ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET,
        })
    }

    async validate(payload:any){
        console.log(payload)
        
        if(!payload){
            throw new HttpException("Invalid Token Access to this Recruiter Service",HttpStatus.UNAUTHORIZED)
        }
        return true
    }

}
