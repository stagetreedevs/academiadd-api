/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() user: User): Promise<any> {
    return await this.userService.createUser(user);
  }

  @Get()
  async getAllUsers(): Promise<any[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<any> {
    return this.userService.getUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    return this.userService.getUserByEmail(email);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updates: Partial<User>): Promise<void> {
    await this.userService.updateUser(id, updates);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
