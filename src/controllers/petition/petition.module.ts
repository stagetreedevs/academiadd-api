import { Module } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { PetitionController } from './petition.controller';

@Module({
  controllers: [PetitionController],
  providers: [PetitionService],
  exports: [PetitionService],
})
export class PetitionModule {}
