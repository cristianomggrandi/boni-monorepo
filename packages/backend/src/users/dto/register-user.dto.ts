import { Type } from "class-transformer"
import {
    IsDateString,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator"

export class RegisterUserDto {
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: "Name must contain only letters" })
    @Matches(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters and spaces" })
    @MaxLength(100, { message: "Name cannot exceed 100 characters" })
    name: string

    @IsEmail({}, { message: "Please provide a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email: string

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Minimum password length is 6" })
    password: string

    // WORKER/MANAGER fields
    @IsOptional()
    @IsInt({ message: "Business ID must be a number" })
    @Type(() => Number)
    businessId?: number

    @IsOptional()
    @IsString({ message: "Employee ID must be a string" })
    employeeId?: string

    @IsOptional()
    @IsDateString({}, { message: "Hire date must be a valid date" })
    hireDate?: string

    // USER fields
    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsDateString({}, { message: "Birthday must be a valid date" })
    birthday?: string
}
