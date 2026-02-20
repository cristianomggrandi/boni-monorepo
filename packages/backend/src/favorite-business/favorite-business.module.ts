import { Module } from '@nestjs/common';
import { FavoriteBusinessService } from './favorite-business.service';
import { FavoriteBusinessController } from './favorite-business.controller';

@Module({
  controllers: [FavoriteBusinessController],
  providers: [FavoriteBusinessService],
})
export class FavoriteBusinessModule {}
