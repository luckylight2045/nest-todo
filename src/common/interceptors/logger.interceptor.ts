import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before.....');

    const now = Date.now();

    console.log('Type: ', context.getType());
    const req = context.switchToHttp().getRequest();
    req.user = 'Asra Nazifi';

    return next
      .handle()
      .pipe(tap(() => console.log(`After.... ${Date.now() - now}ms`)));
  }
}
