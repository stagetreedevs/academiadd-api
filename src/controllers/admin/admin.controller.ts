/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  async createAdmin(@Body() admin: Admin): Promise<void> {
    return await this.adminService.createAdmin(admin);
  }

  @Get()
  async getAllAdmins(): Promise<any[]> {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  async getAdminById(@Param('id') id: string): Promise<any> {
    return this.adminService.getAdminById(id);
  }

  @Get('email/:email')
  async getAdminByEmail(@Param('email') email: string): Promise<any> {
    return this.adminService.getAdminByEmail(email);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() updates: Partial<Admin>): Promise<void> {
    await this.adminService.updateAdmin(id, updates);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string): Promise<void> {
    await this.adminService.deleteAdmin(id);
  }
}
