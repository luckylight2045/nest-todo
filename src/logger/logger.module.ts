import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

const loggerProvider = {
  provide: 'LOGGER',
  useClass: LoggerService,
};

@Global()
@Module({
  imports: [],
  providers: [loggerProvider],
  exports: [loggerProvider],
})
export class LoggerModule {}
