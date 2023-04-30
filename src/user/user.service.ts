import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    return this.client.send('createUser', createUserDto);
    // return 'This action adds a new user';
  }

  findAll() {
    return this.client.send('findAllUser', {});
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return this.client.send('findOneUser', id);

    // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login(credentials: { username: string; password: string }) {
    return this.client.send('login', credentials);
  }
}
