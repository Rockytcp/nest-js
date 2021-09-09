import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { UserInterface } from './model/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: UserInterface): Observable<UserInterface> {
    return from(this.userRepository.save(user));
  }

  getAllUsers(): Observable<UserInterface[]> {
    return from(this.userRepository.find());
  }
}
