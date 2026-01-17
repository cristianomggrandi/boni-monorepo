import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { AdminOnly } from "../auth/auth.guard"
import { CreateServiceGroupDto } from "./dto/create-service-group.dto"
import { UpdateServiceGroupDto } from "./dto/update-service-group.dto"
import { ServiceGroupsService } from "./service-group.service"

@Controller("service-group")
export class ServiceGroupsController {
    constructor(private readonly categoriesService: ServiceGroupsService) {}

    @AdminOnly()
    @Post()
    create(@Body() createCategoryDto: CreateServiceGroupDto) {
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoriesService.findOne(+id)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateServiceGroupDto) {
        return this.categoriesService.update(+id, updateCategoryDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.categoriesService.remove(+id)
    }
}
