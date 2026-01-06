import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserJWTPayload } from "./types"

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user as UserJWTPayload

    return data ? user?.[data] : user
})
