import { IsInt, IsOptional, IsString } from "class-validator"

export class CreateServiceDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsInt()
    businessId: number

    @IsInt()
    serviceGroupId: number
}
