import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../auth/decorators/user.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  AuthorizationGuard,
  Resource,
  RequirePermissions,
  PermissionGroups,
} from '../../security/authorization/authorization.decorators';
import { ResourceType } from '../../security/authorization/authorization.types';

@Controller('users')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @RequirePermissions(PermissionGroups.USER_MANAGEMENT[0]) // user:read
  async getCurrentUser(@User('id') userId: string) {
    return this.usersService.getCurrentUser(userId);
  }

  @Put('me')
  @RequirePermissions(PermissionGroups.USER_MANAGEMENT[1]) // user:update
  async updateCurrentUser(
    @User('id') userId: string,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.usersService.updateCurrentUser(userId, updateData);
  }
}
