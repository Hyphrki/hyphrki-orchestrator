import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from './authorization.service';
import { Permission, ResourceType } from './authorization.types';
import { SKIP_AUTH_KEY } from '../../auth/decorators/skip-auth.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route should skip authorization
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Get required permissions from metadata
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    const resourceType = this.reflector.getAllAndOverride<ResourceType>(
      'resourceType',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No permissions required
    }

    // Get resource ID from request params or body
    const resourceId = this.extractResourceId(request, resourceType);

    // Check each required permission
    for (const permission of requiredPermissions) {
      const result = await this.authorizationService.checkPermission(
        user.id,
        permission,
        resourceType,
        resourceId,
      );

      if (!result.allowed) {
        throw new ForbiddenException(
          result.reason || 'Insufficient permissions',
        );
      }
    }

    return true;
  }

  private extractResourceId(
    request: any,
    resourceType?: ResourceType,
  ): string | undefined {
    // Extract resource ID based on common patterns
    const { params, body } = request;

    // Check URL parameters
    if (params.id) {
      return params.id;
    }

    // Check for resource-specific ID patterns
    switch (resourceType) {
      case ResourceType.ORGANIZATION:
        return params.organizationId || params.orgId || body.organizationId;
      case ResourceType.USER:
        return params.userId || body.userId;
      case ResourceType.AGENT:
        return params.agentId || body.agentId;
      case ResourceType.WORKFLOW:
        return params.workflowId || body.workflowId;
      case ResourceType.EXECUTION:
        return params.executionId || body.executionId;
      default:
        return params.id || body.id;
    }
  }
}
