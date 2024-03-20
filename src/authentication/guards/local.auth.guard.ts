import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //console.log("<<11>>", context);
    try {
      
    const result = (await super.canActivate(context)) as boolean;
    if (result) {
      const request = context.switchToHttp().getRequest();
      console.log("request", request);
      await super.logIn(request);
    }
    console.log("<<<<>>>", result);
    // const request = context.switchToHttp().getRequest();
    // console.log("request", request);
    // await super.logIn(request);
    return result;
  } catch (error) {
    console.log(error);
  }
  }
}
