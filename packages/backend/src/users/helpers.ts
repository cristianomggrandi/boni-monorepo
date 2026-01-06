import { Role, User } from "@boni/database"
import { UserJWTPayload } from "src/auth/types"

export function isAdmin(user: UserJWTPayload) {
    return user.role === Role.ADMIN
}

// TODO: Deveria ser lidado pelo banco de dados?
export function getUserPublicInfo(user: User) {
    const { password, active, ...publicUser } = user

    return publicUser
}
