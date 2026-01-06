import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../prisma/prisma.service"
import { AppointmentsService } from "./appointments.service"

describe("AppointmentsService", () => {
    let service: AppointmentsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppointmentsService,
                {
                    provide: PrismaService,
                    useValue: {
                        appointment: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                            findFirst: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        service = module.get<AppointmentsService>(AppointmentsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
