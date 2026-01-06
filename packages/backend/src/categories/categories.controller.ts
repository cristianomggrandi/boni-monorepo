import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { AdminOnly } from "../auth/auth.guard"
import { CategoriesService } from "./categories.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @AdminOnly()
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
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

    @AdminOnly()
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto)
    }

    @AdminOnly()
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.categoriesService.remove(+id)
    }
}
