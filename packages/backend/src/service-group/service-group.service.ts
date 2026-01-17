import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateServiceGroupDto } from "./dto/create-service-group.dto"
import { UpdateServiceGroupDto } from "./dto/update-service-group.dto"

@Injectable()
export class ServiceGroupsService {
    constructor(private prisma: PrismaService) {}

    create(data: CreateServiceGroupDto) {
        const { serviceIds, businessId, ...serviceGroupData } = data

        return this.prisma.serviceGroup.create({
            data: {
                services: { connect: serviceIds.map(id => ({ id })) },
                business: { connect: { id: businessId } },
                ...serviceGroupData,
            },
        })
    }

    findAll() {
        return this.prisma.serviceGroup.findMany({
            // where: { parentId: null },
            // include: { subcategories: true },
        })
    }

    findOne(id: number) {
        return this.prisma.serviceGroup.findUnique({
            where: { id },
        })
    }

    update(id: number, updateServiceGroupDto: UpdateServiceGroupDto) {
        return this.prisma.serviceGroup.update({
            where: { id },
            data: updateServiceGroupDto,
        })
    }

    remove(id: number) {
        return this.prisma.serviceGroup.delete({ where: { id } })
    }
}
