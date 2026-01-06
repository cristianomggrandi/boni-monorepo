import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Res,
} from "@nestjs/common"
import type { Response } from "express"
import { AdminOnly, AdminOrOwnUser } from "../auth/auth.guard"
import { type UserJWTPayload } from "../auth/types"
import { User } from "../auth/user.decorator"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @AdminOnly()
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @AdminOrOwnUser() // TODO: Maybe this is wrong
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne(+id)
    }

    @AdminOrOwnUser()
    @Delete(":id")
    delete(@Param("id") id: string, @User() user: UserJWTPayload) {
        return this.usersService.delete(+id, user)
    }

    @AdminOrOwnUser()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto,
        @User() user: UserJWTPayload,
        @Res({ passthrough: true }) response: Response
    ) {
        const jwt = await this.usersService.update(+id, updateUserDto, user)

        response.cookie("accessToken", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Recommended: 'strict', helps prevent CSRF attacks
            sameSite: "none",
            maxAge: 3600000, // Cookie expiration time (e.g., 1 hour in milliseconds)
            path: "/",
        })

        return
    }
}
