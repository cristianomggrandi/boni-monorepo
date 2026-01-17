import { Module } from "@nestjs/common"
import { ServiceGroupsController } from "./service-group.controller"
import { ServiceGroupsService } from "./service-group.service"

@Module({
    controllers: [ServiceGroupsController],
    providers: [ServiceGroupsService],
})
export class ServiceGroupsModule {}
