import { Test, TestingModule } from "@nestjs/testing"
import { PrismaService } from "../prisma/prisma.service"
import { BusinessService } from "./business.service"
import { CreateBusinessDto } from "./dto/create-business.dto"

describe("BusinessService", () => {
    let service: BusinessService
    let prismaService: PrismaService

    const mockPrismaService = {
        business: {
            create: jest.fn(),
            findMany: jest.fn(),
        },
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BusinessService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile()

        service = module.get<BusinessService>(BusinessService)
        prismaService = module.get<PrismaService>(PrismaService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("create", () => {
        it("should create a business without address", async () => {
            const createBusinessDto: CreateBusinessDto = {
                name: "Tech Solutions Inc",
            }

            const expectedResult = {
                id: 1,
                name: "Tech Solutions Inc",
                address: null,
            }

            mockPrismaService.business.create.mockResolvedValue(expectedResult)

            const result = await service.create(createBusinessDto)

            expect(mockPrismaService.business.create).toHaveBeenCalledWith({
                data: createBusinessDto,
                include: { address: true, categories: true },
            })
            expect(result).toEqual(expectedResult)
        })

        it("should create a business with address", async () => {
            const createBusinessDto: CreateBusinessDto = {
                name: "Downtown Coffee Shop",
                address: {
                    create: {
                        streetNumber: "123",
                        street: "Main Street",
                        city: "San Francisco",
                        state: "CA",
                        zipCode: "94102",
                        country: "USA",
                        latitude: 37.7749,
                        longitude: -122.4194,
                    },
                },
            }

            const expectedResult = {
                id: 1,
                name: "Downtown Coffee Shop",
                address: {
                    id: 1,
                    streetNumber: "123",
                    street: "Main Street",
                    city: "San Francisco",
                    state: "CA",
                    zipCode: "94102",
                    country: "USA",
                    latitude: 37.7749,
                    longitude: -122.4194,
                    businessId: 1,
                },
            }

            mockPrismaService.business.create.mockResolvedValue(expectedResult)

            const result = await service.create(createBusinessDto)

            expect(mockPrismaService.business.create).toHaveBeenCalledWith({
                data: createBusinessDto,
                include: { address: true, categories: true },
            })
            expect(result).toEqual(expectedResult)
        })
    })

    describe("findAll", () => {
        it("should return all businesses", async () => {
            const expectedResult = [
                { id: 1, name: "Business 1", address: null },
                { id: 2, name: "Business 2", address: null },
            ]

            mockPrismaService.business.findMany.mockResolvedValue(expectedResult)

            const result = await service.findAll()

            expect(mockPrismaService.business.findMany).toHaveBeenCalled()
            expect(result).toEqual(expectedResult)
        })
    })
})
