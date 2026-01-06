import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma/prisma.service"
import { RegisterUserDto } from "../users/dto/register-user.dto"
import { getUserPublicInfo } from "../users/helpers"
import { LoginUserDto } from "./dto/login-user.dto"
import { UserJWTPayload } from "./types"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async login(data: LoginUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        })

        if (!user || user.password !== data.password)
            throw new UnauthorizedException("Invalid credentials")

        const payload: UserJWTPayload = { sub: user.id, ...getUserPublicInfo(user) }

        const accessToken = await this.jwtService.signAsync(payload)

        return accessToken
    }

    async signup(data: RegisterUserDto) {
        try {
            const user = await this.prisma.user.create({ data })

            const payload: UserJWTPayload = { sub: user.id, ...getUserPublicInfo(user) }

            const accessToken = await this.jwtService.signAsync(payload)

            return accessToken
        } catch (error) {
            if (error.code === "P2002") throw new ConflictException("User already exists")

            throw error
        }
    }
}
