import { Test, TestingModule } from "@nestjs/testing"
import { CategoriesController } from "./service-group.controller"
import { CategoriesService } from "./service-group.service"

describe("CategoriesController", () => {
    let controller: CategoriesController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [
                {
                    provide: CategoriesService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile()

        controller = module.get<CategoriesController>(CategoriesController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
