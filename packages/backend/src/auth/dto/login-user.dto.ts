import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class LoginUserDto {
    @IsEmail({}, { message: "Please provide a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email: string

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Minimum password length is 6" })
    password: string
}
