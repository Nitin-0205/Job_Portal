import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { LoginUserDto } from '../dto/login-user.dto';

jest.mock('../user.service.ts');


describe('Controller', () => {
    let usercontroller: UserController;
    let userservice: UserService;
    beforeEach(async () => {
        const userTestModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        }).compile();
        usercontroller = userTestModule.get<UserController>(UserController);
        userservice = userTestModule.get<UserService>(UserService);
        jest.clearAllMocks();

    })


    describe("login", () => {
        describe("Should called the login Controller",  () => {
            const useDto = new LoginUserDto();
            useDto.email = "nitin@gmail.com";
            useDto.password = "12345678";
            useDto.role = "employer";


            let user: any;
            beforeEach(async () => {
                user = await usercontroller.login(useDto);
            })

            test("Should called the login Service", async () => {
                expect(userservice.userLogin).toBeCalledWith(useDto);
            })

            

            test("Should return the user", async () => {
                expect(user).toEqual({
                    msg: "User Login Successfull !!!",
                    userId: "ad1a09a3-ed9f-43b0-b35e-3308b3085cd7",
                })

            })

        })

    })

});