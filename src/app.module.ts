import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminsModule } from './admins/admins.module'
import { LoggerMidleware } from './admins/middlewares/admins.middleware'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AdminsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMidleware).forRoutes('admins')
  }
}
