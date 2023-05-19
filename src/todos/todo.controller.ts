import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  ParseEnumPipe,
  UseInterceptors,
  Req,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { User } from './schemas/user.schema';
import { UserCreateDto } from './dtos/user-create.dto';
import { TodoCategory } from './todo.enum';
import { UserResponseDto } from './response.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { TestGuards } from 'src/common/guards/TestGuards.guards';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(TestGuards)
  @UseInterceptors(
    ClassSerializerInterceptor,
    LoggerInterceptor,
    TransformInterceptor,
  )
  @Get('/users')
  async getAllUsers(@Req() request): Promise<UserResponseDto[]> {
    console.log('request user', request.user);
    const users = await this.todoService.userList();

    return users.map((user) => new UserResponseDto(user));
  }

  @Post('/register')
  async addUser(@Body() body: UserCreateDto): Promise<User> {
    return await this.todoService.createUser(body);
  }

  @Post('/todos/:userId')
  async addUserTask(
    @Param('userId') userId: string,
    @Body() todoCreateDto: TodoCreateDto,
  ) {
    return await this.todoService.addTodo(userId, todoCreateDto);
  }

  ///UsePipes(new ValidationPipe())
  @Get('/todos/:userId')
  async getUserTodos(@Param('userId') userId: string) {
    return await this.todoService.getUserTodos(userId);
  }
}
