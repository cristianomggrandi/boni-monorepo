import { Role } from "@boni/database"

export interface UserJWTPayload {
    sub: number
    name: string
    email: string
    role: Role
    //   phone: null,
    //   birthday: null,
}

export type JWT<T> = T & {
    sub: number
    iat: number
    exp: number
    createdAt: string
    updatedAt: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserJWTPayload
        }
    }
}

export {}
