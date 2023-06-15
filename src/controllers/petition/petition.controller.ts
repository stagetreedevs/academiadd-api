/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { Petition } from './petition';

@Controller('petition')
export class PetitionController {
  constructor(private readonly ptService: PetitionService) { }

  @Post()
  async create(@Body() petition: Petition): Promise<any> {
    return await this.ptService.create(petition);
  }

  @Get()
  async getAll(): Promise<any[]> {
    return this.ptService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.ptService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Petition>): Promise<void> {
    await this.ptService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.ptService.delete(id);
  }
}
