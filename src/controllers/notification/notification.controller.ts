/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
@Controller('notification')
export class NotificationController {
  constructor(private readonly notService: NotificationService) { }

  @Post()
  async create(@Body() notificacao: Notification): Promise<any> {
    return await this.notService.create(notificacao);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.notService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.notService.getById(id);
  }

  @Get('receiver/:receiverId')
  async getAllByReceiverId(@Param('receiverId') receiverId: string): Promise<any> {
    return this.notService.getAllByReceiverId(receiverId);
  }

  @Get('unread/:receiverId')
  async getUnreadByReceiverId(@Param('receiverId') receiverId: string): Promise<any> {
    return this.notService.getUnreadByReceiverId(receiverId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Notification>): Promise<void> {
    await this.notService.update(id, updates);
  }

  @Put('read/:id')
  async read(@Param('id') id: string): Promise<void> {
    await this.notService.read(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.notService.delete(id);
  }
}
