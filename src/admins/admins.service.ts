import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import * as bcrypt from 'bcrypt'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { Prisma } from '../generated/prisma/client'

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.admin.findMany()
  }

  async create(dto: CreateAdminDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10)

    return this.prisma.admin.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        passwordHash: passwordHash
      }
    })
  }

  async update(id: number, dto: UpdateAdminDto) {
    try {
      const { password, ...rest } = dto
      const data: Prisma.AdminUpdateInput = { ...rest }

      if (password) {
        data.passwordHash = await bcrypt.hash(password, 10)
      }

      return await this.prisma.admin.update({
        where: { id },
        data: data
      })
    } catch {
      throw new NotFoundException('Admin not found')
    }
  }
}
