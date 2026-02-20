import { Test, TestingModule } from "@nestjs/testing"
import { FavoriteServiceService } from "./favorite-service.service"

describe("FavoriteServiceService", () => {
    let service: FavoriteServiceService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FavoriteServiceService],
        }).compile()

        service = module.get<FavoriteServiceService>(FavoriteServiceService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})
