import { Body, Controller, Post, Res } from "@nestjs/common"
import type { Response } from "express"
import { RegisterUserDto } from "../users/dto/register-user.dto"
import { Public } from "./auth.guard"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("login")
    async login(@Body() data: LoginUserDto, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.login(data)

        response.cookie("accessToken", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Recommended: 'strict', helps prevent CSRF attacks
            sameSite: "none",
            maxAge: 3600000, // Cookie expiration time (e.g., 1 hour in milliseconds)
            path: "/",
        })

        return jwt
    }

    @Public()
    @Post("signup")
    async signup(@Body() data: RegisterUserDto, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.signup(data)

        response.cookie("accessToken", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: "strict", // Recommended: helps prevent CSRF attacks
            maxAge: 3600000, // Cookie expiration time (e.g., 1 hour in milliseconds)
            path: "/",
        })

        return jwt
    }
}
