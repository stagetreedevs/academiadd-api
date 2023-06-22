/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Invitation } from './invitation';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly conService: InvitationService) { }

  @Post()
  async create(@Body() petition: Invitation): Promise<any> {
    return await this.conService.create(petition);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.conService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.conService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.conService.delete(id);
  }

  @Put('confirm/:id')
  async confirm(@Param('id') id: string): Promise<void> {
    await this.conService.confirm(id);
  }

  @Put('refuse/:id')
  async refuse(@Param('id') id: string): Promise<void> {
    await this.conService.refuse(id);
  }
}
