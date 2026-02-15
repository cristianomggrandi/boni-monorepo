import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService, TokenExpiredError } from "@nestjs/jwt"
import { Request } from "express"
import { PrismaService } from "../prisma/prisma.service"
import { RegisterUserDto } from "../users/dto/register-user.dto"
import { getUserPublicInfo } from "../users/helpers"
import { AuthResponseDto } from "./dto/auth-response.dto"
import { LoginUserDto } from "./dto/login-user.dto"
import { JWT, UserJWTPayload } from "./types"

const ACCESS_TOKEN_EXPIRATION = "15m"
const REFRESH_TOKEN_EXPIRATION = "7d"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    private async generateTokens(payload: UserJWTPayload): Promise<AuthResponseDto> {
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: REFRESH_TOKEN_EXPIRATION,
        })

        return { accessToken, refreshToken }
    }

    async login(data: LoginUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        })

        if (!user || user.password !== data.password)
            throw new UnauthorizedException("Invalid credentials")

        const publicUserInfo = getUserPublicInfo(user)

        const payload: UserJWTPayload = { sub: user.id, ...publicUserInfo }

        const tokens = await this.generateTokens(payload)

        return { ...tokens, user: publicUserInfo }
    }

    async signup(data: RegisterUserDto) {
        try {
            const user = await this.prisma.user.create({ data })

            const publicUserInfo = getUserPublicInfo(user)

            const payload: UserJWTPayload = { sub: user.id, ...publicUserInfo }

            const tokens = await this.generateTokens(payload)

            return { ...tokens, user: publicUserInfo }
        } catch (error) {
            if (error.code === "P2002") throw new ConflictException("User already exists")

            throw error
        }
    }

    async refresh(refreshToken: string) {
        try {
            const { exp, iat, createdAt, updatedAt, ...payload }: JWT<UserJWTPayload> =
                await this.jwtService.verifyAsync(refreshToken, {
                    secret: process.env.JWT_SECRET,
                })

            const newAccessToken = await this.jwtService.signAsync(payload, {
                expiresIn: ACCESS_TOKEN_EXPIRATION,
            })

            const publicUserInfo = getUserPublicInfo(payload as any)

            return { token: newAccessToken, user: publicUserInfo }
        } catch (error) {
            console.error("ERROR REFRESH", error)
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException("Refresh token expired")
            }

            throw new UnauthorizedException("Invalid refresh token")
        }
    }

    async getUserByToken(request: Request) {
        const user = request.user as UserJWTPayload

        return user
    }
}
