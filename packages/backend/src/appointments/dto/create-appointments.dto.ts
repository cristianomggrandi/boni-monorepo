import { ArrayMinSize, IsArray, IsInt, IsString } from "class-validator"

export class CreateAppointmentsDto {
    @IsString()
    date: string

    @IsInt()
    userId: number

    @IsInt()
    businessId: number

    @IsInt()
    workerId: number

    @IsArray()
    @ArrayMinSize(1)
    serviceIds: number[]
}
