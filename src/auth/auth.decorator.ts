import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
  iss: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserInterface;
  },
);
