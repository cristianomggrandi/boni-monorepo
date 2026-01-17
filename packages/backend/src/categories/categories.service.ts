import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateCategoryDto } from "./dto/create-category.dto"
import { UpdateCategoryDto } from "./dto/update-category.dto"

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.businessCategory.create({ data: createCategoryDto })
    }

    findAll() {
        return this.prisma.businessCategory.findMany({
            where: { parentId: null },
            include: { subcategories: true },
        })
    }

    findOne(id: number) {
        return this.prisma.businessCategory.findUnique({
            where: { id },
            include: { parent: true, subcategories: true },
        })
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.prisma.businessCategory.update({
            where: { id },
            data: updateCategoryDto,
        })
    }

    remove(id: number) {
        return this.prisma.businessCategory.delete({ where: { id } })
    }

    findSubcategories(id: number) {
        return this.prisma.businessCategory.findMany({
            where: { parentId: id },
        })
    }
}
