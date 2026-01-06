import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../prisma/prisma.service"
import { ServiceService } from "./service.service"

describe("ServiceService", () => {
    let service: ServiceService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ServiceService,
                {
                    provide: PrismaService,
                    useValue: {
                        service: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        service = module.get<ServiceService>(ServiceService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
