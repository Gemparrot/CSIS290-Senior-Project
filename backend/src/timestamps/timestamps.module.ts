import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timestamps } from './timestamps.entity';
import { Mission } from '../missions/missions.entity';
import { TimestampsService } from './timestamps.service';
import { TimestampsController } from './timestamps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Timestamps, Mission])],
  controllers: [TimestampsController],
  providers: [TimestampsService],
})
export class TimestampsModule {}
