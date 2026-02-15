import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common"
import type { Request, Response } from "express"
import { RegisterUserDto } from "../users/dto/register-user.dto"
import { Public } from "./auth.guard"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dto/login-user.dto"
import { RefreshDto } from "./dto/refresh.dto"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("login")
    async login(@Body() data: LoginUserDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(data)
    }

    @Public()
    @Post("signup")
    async signup(@Body() data: RegisterUserDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.signup(data)
    }

    @Public()
    @Post("refresh")
    async refresh(@Body() data: RefreshDto) {
        return this.authService.refresh(data.refreshToken)
    }

    @Get("user")
    async getUserByToken(@Req() request: Request) {
        return this.authService.getUserByToken(request)
    }
}
