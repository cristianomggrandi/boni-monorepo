import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AppointmentsModule } from "./appointments/appointments.module"
import { AuthModule } from "./auth/auth.module"
import { BusinessModule } from "./business/business.module"
import { CategoriesModule } from "./categories/categories.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ServiceModule } from "./service/service.module"
import { UsersModule } from "./users/users.module"

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        AuthModule,
        CategoriesModule,
        BusinessModule,
        AppointmentsModule,
        ServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
