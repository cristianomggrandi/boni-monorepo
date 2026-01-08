import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import type { UserJWTPayload } from "../auth/types"
import { User } from "../auth/user.decorator"
import { AppointmentsService } from "./appointments.service"
import { CreateAppointmentsDto } from "./dto/create-appointments.dto"
import { UpdateAppointmentsDto } from "./dto/update-appointments.dto"

@Controller("appointments")
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    create(@Body() createAppointmentsDto: CreateAppointmentsDto) {
        return this.appointmentsService.create(createAppointmentsDto)
    }

    @Get()
    findAll() {
        return this.appointmentsService.findAll()
    }

    @Get("next")
    findNext(@User() user: UserJWTPayload) {
        return this.appointmentsService.next(user.sub)
    }

    @Get("next/:userId")
    findNextById(@Param("userId") id: string) {
        return this.appointmentsService.next(+id)
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.appointmentsService.findOne(+id)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAppointmentsDto: UpdateAppointmentsDto) {
        return this.appointmentsService.update(+id, updateAppointmentsDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.appointmentsService.remove(+id)
    }
}
