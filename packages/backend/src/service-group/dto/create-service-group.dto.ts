import { IsArray, IsInt, IsOptional, IsString } from "class-validator"

export class CreateServiceGroupDto {
    @IsString()
    name: string

    @IsInt()
    businessId: number

    @IsOptional()
    @IsArray()
    serviceIds: number[]
}
