import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInterface } from './model/user.interface';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
  ): Observable<UserInterface> {
    const user = {
      id: uuid().toString(),
      name,
      email,
    };

    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers(): Observable<UserInterface[]> {
    return this.userService.getAllUsers();
  }
}
