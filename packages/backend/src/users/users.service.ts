import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { type UserJWTPayload } from "../auth/types"
import { PrismaService } from "../prisma/prisma.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import { getUserPublicInfo, isAdmin } from "./helpers"

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async findAll() {
        return (await this.prisma.user.findMany()).map(u => getUserPublicInfo(u))
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } })

        return user ? getUserPublicInfo(user) : null
    }

    async delete(id: number, user: UserJWTPayload) {
        if (id !== user.sub && !isAdmin(user))
            throw new ForbiddenException("You can only delete your own profile")

        try {
            return getUserPublicInfo(
                await this.prisma.user.update({
                    where: { id, active: true },
                    data: { active: false },
                })
            )
        } catch (error) {
            if (error.code === "P2025")
                throw new ConflictException(`User with id ${id} doesn't exist`)

            throw error
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto, user: UserJWTPayload) {
        if (updateUserDto.role && !isAdmin(user))
            throw new ForbiddenException("You don't have permission to update user roles")

        if (id !== user.sub && !isAdmin(user))
            throw new ForbiddenException("You can only update your own profile")

        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            })

            const payload: UserJWTPayload = {
                sub: updatedUser.id,
                ...getUserPublicInfo(updatedUser),
            }

            const accessToken = await this.jwtService.signAsync(payload)

            return accessToken
        } catch (error) {
            if (error.code === "P2025")
                throw new ConflictException(`User with id ${id} doesn't exist`)

            throw error
        }
    }
}
