import { Controller, Delete, Get, Param, Post } from "@nestjs/common"
import type { UserJWTPayload } from "src/auth/types"
import { User } from "src/auth/user.decorator"
import { FavoriteServiceService } from "./favorite-service.service"

@Controller("favorite-services")
export class FavoriteServiceController {
    constructor(private readonly favoriteServiceService: FavoriteServiceService) {}

    @Post(":id")
    create(@User() user: UserJWTPayload, @Param("id") id: string) {
        return this.favoriteServiceService.create(user, +id)
    }

    @Get()
    findAll(@User() user: UserJWTPayload) {
        return this.favoriteServiceService.findAll(user)
    }

    @Delete(":id")
    remove(@User() user: UserJWTPayload, @Param("id") id: string) {
        return this.favoriteServiceService.remove(user, +id)
    }
}
