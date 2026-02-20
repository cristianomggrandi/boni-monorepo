import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AppointmentsModule } from "./appointments/appointments.module"
import { AuthModule } from "./auth/auth.module"
import { BusinessModule } from "./business/business.module"
import { CategoriesModule } from "./categories/categories.module"
import { FavoriteBusinessModule } from "./favorite-business/favorite-business.module"
import { FavoriteServiceModule } from "./favorite-service/favorite-service.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ServiceGroupsModule } from "./service-group/service-group.module"
import { ServiceModule } from "./service/service.module"
import { UsersModule } from "./users/users.module"

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        AuthModule,
        BusinessModule,
        CategoriesModule,
        AppointmentsModule,
        ServiceModule,
        ServiceGroupsModule,
        FavoriteServiceModule,
        FavoriteBusinessModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
