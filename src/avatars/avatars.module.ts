import { Module } from "@nestjs/common";
import { AvatarsController } from "./interfaces/http/avatars.controller";
import { CreateAvatarUseCase } from "./application/use-case/create-avatar.usecase";

@Module({
    controllers: [AvatarsController],
    exports: [],
    imports: [],
    providers: [CreateAvatarUseCase],
})

export class AvatarsModule {}