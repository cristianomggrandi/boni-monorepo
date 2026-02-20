import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteBusinessController } from './favorite-business.controller';
import { FavoriteBusinessService } from './favorite-business.service';

describe('FavoriteBusinessController', () => {
  let controller: FavoriteBusinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteBusinessController],
      providers: [FavoriteBusinessService],
    }).compile();

    controller = module.get<FavoriteBusinessController>(FavoriteBusinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
