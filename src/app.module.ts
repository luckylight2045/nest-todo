import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todo-mongo'),
  TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}