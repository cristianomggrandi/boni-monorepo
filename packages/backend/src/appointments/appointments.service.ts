import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateAppointmentsDto } from "./dto/create-appointments.dto"
import { UpdateAppointmentsDto } from "./dto/update-appointments.dto"

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateAppointmentsDto) {
        const { serviceIds, ...appointmentData } = data

        return this.prisma.appointment.create({
            data: {
                ...appointmentData,
                services: { connect: serviceIds.map(id => ({ id })) },
            },
            include: {
                business: { include: { workers: true } },
                services: true,
                user: true,
                worker: true,
            },
        })
    }

    findAll() {
        return this.prisma.appointment.findMany()
    }

    findOne(id: number) {
        return this.prisma.appointment.findUnique({
            where: { id },
            include: {
                business: { include: { workers: true } },
                services: true,
                user: true,
                worker: true,
            },
        })
    }

    update(id: number, data: UpdateAppointmentsDto) {
        return this.prisma.appointment.update({ where: { id }, data })
    }

    remove(id: number) {
        return this.prisma.appointment.delete({ where: { id } })
    }

    next(id: number) {
        return this.prisma.appointment.findFirst({
            where: {
                userId: id,
                date: { gte: new Date() },
            },
            orderBy: { date: "asc" },
            include: { business: true, services: true, worker: { include: { user: true } } },
        })
    }
}
