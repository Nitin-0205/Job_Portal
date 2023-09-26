import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe ,UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RolePipe } from '../pipe/customRole.pipe';
import { UserEntity } from 'src/entities/User.entity';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    // return this.configService.get("JWT_SECRET")
    return this.userService.create(createUserDto);
  }

  @Post("login")
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new RolePipe())
  login(@Body()loginUserDto : LoginUserDto){
    console.log("loginUserDto",loginUserDto);
    return this.userService.userLogin(loginUserDto);

  }
}
