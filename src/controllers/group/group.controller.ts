/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  async create(@Body() group: Group): Promise<any> {
    return await this.groupService.create(group);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.groupService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.groupService.getById(id);
  }
  
  @Get('lawyer/:id')
  async getByLawyerId(@Param('userId') userId: string): Promise<any> {
    return this.groupService.getByLawyerId(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Group>): Promise<void> {
    await this.groupService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.groupService.delete(id);
  }
}
