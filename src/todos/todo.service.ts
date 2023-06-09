import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { TodoCategory } from './todo.enum';
import { LoggerService } from 'src/logger/logger.service';
import { UserCreateDto } from './dtos/user-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    @Inject('LOGGER') private readonly logger: LoggerService,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = await this.User.create({
      username: username,
      password: hashPassword,
    });
    return newUser.toJSON();
  }

  async addTodo(userId: string, todoCreateDto: TodoCreateDto): Promise<User> {
    return await this.User.findByIdAndUpdate(userId, {
      $push: { todo: todoCreateDto },
    });
  }

  async getUserTodos(userId: string) {
    return await this.User.find({ userId }, '_id todo.title todo.done');
  }

  async userList(): Promise<User[]> {
    this.logger.logger(`user is requested`, 'debug');
    return await this.User.find(
      {},
      {
        _id: 1,
        username: 1,
      },
    ).lean();
  }

  async getUser(userId: string) {
    return await this.User.findById({ _id: userId });
  }
}
