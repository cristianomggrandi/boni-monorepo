import { BusinessWhereInput } from "@boni/database/dist/generated/prisma/models"
import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateBusinessDto } from "./dto/create-business.dto"
import { UpdateBusinessDto } from "./dto/update-business.dto"

@Injectable()
export class BusinessService {
    constructor(private prisma: PrismaService) {}

    create(data: CreateBusinessDto) {
        const { categoryIds, ...businessData } = data

        return this.prisma.business.create({
            data: {
                ...businessData,
                ...(categoryIds && {
                    categories: {
                        connect: categoryIds.map(id => ({ id })),
                    },
                }),
            },
            include: { address: true, categories: true },
        })
    }

    findAll(search: Record<string, string>) {
        const where: BusinessWhereInput = {}

        if (search.category) {
            where.categories = {
                some: {
                    id: Number(search.category),
                },
            }
        }

        return this.prisma.business.findMany({
            include: { address: true },
            where,
        })
    }

    findOne(id: number) {
        return this.prisma.business.findUnique({ where: { id }, include: { address: true } })
    }

    update(id: number, data: UpdateBusinessDto) {
        return this.prisma.business.update({ where: { id }, data, include: { address: true } })
    }

    remove(id: number) {
        return this.prisma.business.delete({ where: { id } })
    }
}
