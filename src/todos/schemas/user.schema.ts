import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TodoCategory } from '../todo.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  dueDate: Date;

  @Prop({ required: true })
  type: TodoCategory;

  @Prop({ default: false })
  done: boolean;
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, minlength: [6, 'password is short'] })
  password: string;

  @Prop([Todo])
  todo: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
