import { Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtApplicantGuard extends AuthGuard("applicantjwt"){
}
