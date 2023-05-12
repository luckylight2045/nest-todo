import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
class Todo{
    @Prop({required:true})
    title:string

    @Prop()
    dueDate:Date

    @Prop({default:false})
    done:boolean
}


@Schema()
export class User{
    @Prop({required:true})
    username:string

    @Prop([Todo])
    todo:Todo[]
}

export const UserSchema = SchemaFactory.createForClass(User)