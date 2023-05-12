import { Controller, Get, Body, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoCreateDto } from "./dtos/todo-create.dto";
import { User } from "./schemas/user.schema";
import { userCreateDto } from "./dtos/user-create.dto";

@Controller()
export class TodoController{
    constructor(private readonly todoService:TodoService){}

    @Get('/users')
    async getAllUsers(){
        return await this.todoService.userList()
    }

    @Post('/addUser')
    async addUser(@Body() body:userCreateDto): Promise<User>{
        return await this.todoService.createUser(body.username)
    }
}