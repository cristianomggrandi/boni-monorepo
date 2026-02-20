import { Injectable } from "@nestjs/common"
import { UserJWTPayload } from "src/auth/types"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class FavoriteServiceService {
    constructor(private prisma: PrismaService) {}

    create(user: UserJWTPayload, serviceId: number) {
        return this.prisma.user.update({
            where: { id: user.sub },
            data: { favoriteServices: { connect: { id: serviceId } } },
        })
    }

    async findAll(user: UserJWTPayload) {
        const res = await this.prisma.user.findUnique({
            where: { id: user.sub },
            select: { favoriteServices: { select: { id: true } } },
        })

        if (!res) return []

        return res.favoriteServices.map(s => s.id)
    }

    async findOne(user: UserJWTPayload, id: number) {
        const res = await this.prisma.user.findUnique({
            where: { id: user.sub },
            select: { favoriteServices: { where: { id }, select: { id: true } } },
        })

        if (!res || !res.favoriteServices) return false

        return res.favoriteServices.length > 0
    }

    remove(user: UserJWTPayload, id: number) {
        return this.prisma.user.update({
            where: { id: user.sub },
            data: { favoriteServices: { disconnect: { id } } },
        })
    }
}
