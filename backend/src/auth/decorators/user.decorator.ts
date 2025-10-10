import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface RequestWithUser {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    subscriptionTier: string;
    organizations: Array<{
      id: string;
      name: string;
      role: string;
    }>;
  };
}

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data as keyof typeof user] : user;
  },
);
