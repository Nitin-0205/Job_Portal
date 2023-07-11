import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RolePipe } from 'src/pipe/customRole.pipe';

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
  @UsePipes(new RolePipe())
  login(@Body()loginUserDto : LoginUserDto): Promise<{ msg: string; userId: string; token: string; }> {
    console.log("loginUserDto",loginUserDto);
    return this.userService.userLogin(loginUserDto);
  }
  
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
