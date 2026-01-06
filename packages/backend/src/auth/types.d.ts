export interface UserJWTPayload {
    sub: number
    name: string
    email: string
    role: Role
}
