import { Role } from "@boni/database"
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    SetMetadata,
    UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { UserJWTPayload } from "./types"

export const IS_PUBLIC_KEY = "isPublic"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const IS_ADMIN_ONLY_KEY = "isAdminOnly"
export const AdminOnly = () => SetMetadata(IS_ADMIN_ONLY_KEY, true)

export const IS_ADMIN_OR_OWN_USER_KEY = "isAdminOrOwnUser"
export const AdminOrOwnUser = () => SetMetadata(IS_ADMIN_OR_OWN_USER_KEY, true)

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) return true

        const request = context.switchToHttp().getRequest()
        // const token = this.extractTokenFromHeader(request)
        const token = request.cookies.accessToken

        if (!token) throw new UnauthorizedException()

        try {
            console.log("Teste 2:", token)
            const payload: UserJWTPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })

            request["user"] = payload
        } catch {
            throw new UnauthorizedException()
        }

        const isAdmin = (request.user as UserJWTPayload).role === Role.ADMIN

        if (isAdmin) return true

        const isAdminOnly = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_ONLY_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (isAdminOnly) throw new ForbiddenException("You cannot change other user's data")

        const isAdminOrOwnUser = this.reflector.getAllAndOverride<boolean>(
            IS_ADMIN_OR_OWN_USER_KEY,
            [context.getHandler(), context.getClass()]
        )

        console.log("request.user:", request.user)
        if (isAdminOrOwnUser && request.user.sub !== Number(request.params.id))
            throw new ForbiddenException("You cannot change other user's data")

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? token : undefined
    }
}
