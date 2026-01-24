import { Controller, Get, Query, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from './guards/auth.guard'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { User } from '../generated/prisma/client'

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query('page', ParseIntPipe) page: number): Promise<User[]> {
    console.log('Query page', page)
    return this.usersService.findAll()
  }
}
