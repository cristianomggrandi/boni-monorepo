import { IsInt, IsOptional, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsOptional()
    @IsInt()
    parentId?: number
}
