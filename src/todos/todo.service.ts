import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {User} from './schemas/user.schema'
import { TodoCreateDto } from "./dtos/todo-create.dto";

@Injectable()
export class TodoService{
    constructor(@InjectModel(User.name) private readonly User:Model<User>){}

    async createUser(username:string):Promise<User>{
        return await this.User.create({username})
    }

    async addTodo(userId:string, todoCreateDto:TodoCreateDto) : Promise<User>{
        return await this.User.findByIdAndUpdate(userId, 
            {
                $push:{todo:todoCreateDto}
            })
    }

    async getUserTodos(userId:string):Promise<User>{
        return await this.User.findById(userId)
    }

    async userList():Promise<User[]>{
        return await this.User.find({},
            {
                _id:1,
                username:1
            })
    }
}