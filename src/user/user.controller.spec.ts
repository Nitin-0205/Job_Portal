import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

describe('Controller', () => {
    let Controller: UserController;
    let Service: UserService;

    beforeEach(async ()=>{
        const userTestModule = await Test.createTestingModule({
            controllers:[UserController],
            providers:[UserService]
        }).compile();
    })

    describe("login",()=>{
        it("should return a user object with a token " ,async ()=>{

            const user = {
                email:"nitin@gmail.com",
                password:"123456"
            }
            const result = {
                email:"",
                userId:"",
                token:"",
            }
            
        })
    })
    
});