import { Role } from "@boni/database"
import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsOptional } from "class-validator"
import { RegisterUserDto } from "./register-user.dto"

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @IsOptional()
    @IsEnum(Role, { message: "Role must be one of: USER, WORKER, MANAGER, ADMIN" })
    role?: Role
}
