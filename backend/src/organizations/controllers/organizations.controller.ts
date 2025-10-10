import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizationsService } from '../services/organizations.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../auth/decorators/user.decorator';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import {
  AuthorizationGuard,
  Resource,
  RequirePermissions,
  PermissionGroups,
} from '../../security/authorization/authorization.decorators';
import { ResourceType } from '../../security/authorization/authorization.types';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
@Resource(ResourceType.ORGANIZATION)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @RequirePermissions(PermissionGroups.ORGANIZATION_MANAGEMENT[0]) // organization:read
  async getUserOrganizations(@User('id') userId: string) {
    return this.organizationsService.getUserOrganizations(userId);
  }

  @Post()
  @RequirePermissions(PermissionGroups.ORGANIZATION_MANAGEMENT[1]) // organization:create
  async createOrganization(
    @User('id') userId: string,
    @Body() createData: CreateOrganizationDto,
  ) {
    return this.organizationsService.createOrganization(userId, createData);
  }

  @Get(':id')
  @RequirePermissions(PermissionGroups.ORGANIZATION_MANAGEMENT[0]) // organization:read
  async getOrganization(
    @User('id') userId: string,
    @Param('id') organizationId: string,
  ) {
    return this.organizationsService.getOrganizationById(
      userId,
      organizationId,
    );
  }
}
