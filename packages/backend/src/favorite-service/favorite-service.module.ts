import { Module } from "@nestjs/common"
import { FavoriteServiceController } from "./favorite-service.controller"
import { FavoriteServiceService } from "./favorite-service.service"

@Module({
    controllers: [FavoriteServiceController],
    providers: [FavoriteServiceService],
})
export class FavoriteServiceModule {}
