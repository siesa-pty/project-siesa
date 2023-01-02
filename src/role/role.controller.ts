import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/role.schema';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('all')
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Delete('trash/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.roleService.deleteOne({ _id: id });
  }
}
