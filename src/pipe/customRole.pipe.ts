import { HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

export enum Role {
    EMPLOYER = "employer",
    APPLICANT = "applicant"
}

@Injectable()
export class RolePipe implements PipeTransform {
    readonly allowedRoles:Role[] = [
        Role.EMPLOYER,
        Role.APPLICANT
    ];

    transform(value: any) {
        console.log("value",value)
        const role = value.role.toLowerCase();
        if(!this.allowedRoles.includes(role)){
            throw new HttpException(`${role} is not a valid role !!! Role Must:- ${this.allowedRoles}`,HttpStatus.BAD_REQUEST);
        }
        return value;
    }

}