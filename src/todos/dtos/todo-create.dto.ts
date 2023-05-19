import { TodoCategory } from '../todo.enum';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class TodoCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(TodoCategory)
  type: TodoCategory;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
