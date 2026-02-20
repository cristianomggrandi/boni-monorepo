import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteBusinessService } from './favorite-business.service';

describe('FavoriteBusinessService', () => {
  let service: FavoriteBusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteBusinessService],
    }).compile();

    service = module.get<FavoriteBusinessService>(FavoriteBusinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
