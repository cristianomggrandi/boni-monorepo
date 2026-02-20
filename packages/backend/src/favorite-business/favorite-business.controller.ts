import { Controller, Delete, Get, Param, Post } from "@nestjs/common"
import type { UserJWTPayload } from "src/auth/types"
import { User } from "src/auth/user.decorator"
import { FavoriteBusinessService } from "./favorite-business.service"

@Controller("favorite-businesses")
export class FavoriteBusinessController {
    constructor(private readonly favoriteBusinessService: FavoriteBusinessService) {}

    @Post(":id")
    create(@User() user: UserJWTPayload, @Param("id") id: string) {
        return this.favoriteBusinessService.create(user, +id)
    }

    @Get()
    findAll(@User() user: UserJWTPayload) {
        return this.favoriteBusinessService.findAll(user)
    }

    @Get(":id")
    findOne(@User() user: UserJWTPayload, @Param("id") id: string) {
        return this.favoriteBusinessService.findOne(user, +id)
    }

    @Delete(":id")
    remove(@User() user: UserJWTPayload, @Param("id") id: string) {
        return this.favoriteBusinessService.remove(user, +id)
    }
}
