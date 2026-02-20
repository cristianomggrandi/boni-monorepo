import { Test, TestingModule } from "@nestjs/testing"
import { FavoriteServiceController } from "./favorite-service.controller"
import { FavoriteServiceService } from "./favorite-service.service"

describe("FavoriteServiceController", () => {
    let controller: FavoriteServiceController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FavoriteServiceController],
            providers: [FavoriteServiceService],
        }).compile()

        controller = module.get<FavoriteServiceController>(FavoriteServiceController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })
})
