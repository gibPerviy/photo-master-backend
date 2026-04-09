import { Controller, Get, Query, ParseIntPipe, UseGuards, UseInterceptors, Post, Body, Patch, Param } from '@nestjs/common'
import { AdminsService } from './admins.service'
import { AuthGuard } from './guards/auth.guard'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { Admin } from '../generated/prisma/client'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'

@Controller('admins')
@UseInterceptors(LoggingInterceptor)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query('page', ParseIntPipe) page: number): Promise<Admin[]> {
    console.log('Query page', page)
    return this.adminsService.findAll()
  }

  @Post()
  async create(@Body() admin: CreateAdminDto) {
    await this.adminsService.create(admin)

    return {
      message: 'Admin created successfully'
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAdminDto) {
    await this.adminsService.update(id, dto)

    return {
      message: 'Admin updated successfully'
    }
  }
}
