import { Injectable } from "@nestjs/common"
import { UserJWTPayload } from "src/auth/types"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class FavoriteBusinessService {
    constructor(private prisma: PrismaService) {}

    create(user: UserJWTPayload, businessId: number) {
        console.log("Adding business to favorites:", { userId: user.sub, businessId })
        return this.prisma.user.update({
            where: { id: user.sub },
            data: { favoriteBusinesses: { connect: { id: businessId } } },
        })
    }

    async findAll(user: UserJWTPayload) {
        const res = await this.prisma.user.findUnique({
            where: { id: user.sub },
            select: { favoriteBusinesses: { select: { id: true } } },
        })

        if (!res) return []

        return res.favoriteBusinesses.map(b => b.id)
    }

    async findOne(user: UserJWTPayload, id: number) {
        const res = await this.prisma.user.findUnique({
            where: { id: user.sub },
            select: { favoriteBusinesses: { where: { id }, select: { id: true } } },
        })

        if (!res || !res.favoriteBusinesses) return false

        return res.favoriteBusinesses.length > 0
    }

    async remove(user: UserJWTPayload, id: number) {
        await new Promise(resolve => setTimeout(resolve, 2000))

        return this.prisma.user.update({
            where: { id: user.sub },
            data: { favoriteBusinesses: { disconnect: { id } } },
        })
    }
}
