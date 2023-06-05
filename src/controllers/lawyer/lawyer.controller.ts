/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { Lawyer } from './lawyer';
@Controller('lawyer')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) { }

  @Post()
  async create(@Body() lawyer: Lawyer): Promise<any> {
    return await this.lawyerService.create(lawyer);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.lawyerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.lawyerService.getById(id);
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string): Promise<any> {
    return this.lawyerService.getByEmail(email);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Lawyer>): Promise<void> {
    await this.lawyerService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.lawyerService.delete(id);
  }
}
