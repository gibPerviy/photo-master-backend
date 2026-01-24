import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { LoggerMidleware } from './users/middlewares/users.middleware'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { BaseModule } from './base/base.module';

@Module({
  imports: [UsersModule, PrismaModule, BaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMidleware).forRoutes('users')
  }
}
