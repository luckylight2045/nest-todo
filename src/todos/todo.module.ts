import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerModule } from 'src/logger/logger.module';
import { TestMiddleware } from './todo.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoggerModule,
  ],
  controllers: [TodoController],
  providers: [{ provide: TodoService, useClass: TodoService }],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
