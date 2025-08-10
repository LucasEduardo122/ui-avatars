import { Module } from '@nestjs/common';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [AvatarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
