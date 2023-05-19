import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todos/todo.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { TestGuards } from './common/guards/TestGuards.guards';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todo-mongo'),
    TodoModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: TestGuards,
    },
  ],
})
export class AppModule {}
