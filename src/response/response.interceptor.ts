import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { isSubscription } from 'rxjs/internal/Subscription';

export interface ApiResponse<T> {
  isSuccess: boolean;
  error: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        isSuccess: true,
        error: "",
        data
      })),
      catchError(error => {
        console.log("error", error);
        const errorResponse: ApiResponse<T> = {
          isSuccess: false,
          error: error.message,
          data: null
        };
        return throwError(() => new HttpException(errorResponse, error.status));
      }
      ));
  }

  // errorHandler(exception: HttpException, context: ExecutionContext) {
  //   const ctx = context.switchToHttp();
  //   const request = ctx.getRequest();
  //   const response = ctx.getResponse();

  //   const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

  //   response.status(status).json({
  //     isSuccess: false,
  //     error: exception.message,
  //     data: {}
  //   });
  // }

  // responseHandler(res: any, context: ExecutionContext) {
  //   const ctx = context.switchToHttp();
  //   const response = ctx.getResponse();
  //   const request = ctx.getRequest();

  //   const statusCode = response.statusCode

  //   return response
  // }
}
