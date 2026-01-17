import { Type } from "class-transformer"
import {
    IsInt,
    IsLatitude,
    IsLongitude,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
    ValidateNested,
} from "class-validator"

class CreateAddressDto {
    @IsString()
    streetNumber: string

    @IsString()
    street: string

    @IsString()
    city: string

    @IsString()
    state: string

    @IsString()
    zipCode: string

    @IsString()
    country: string

    @IsLatitude()
    latitude: number

    @IsLongitude()
    longitude: number
}

class CreateAddressNestedDto {
    @ValidateNested()
    @Type(() => CreateAddressDto)
    create: CreateAddressDto
}

export class CreateBusinessDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsInt({ each: true })
    @IsPositive({ each: true })
    serviceGroupIds: number[]

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateAddressNestedDto)
    address?: CreateAddressNestedDto
}
