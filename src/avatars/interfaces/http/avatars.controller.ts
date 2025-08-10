import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { RetornarAvatarDTO } from "./dto/avatarsDTO";
import { CreateAvatarUseCase } from "src/avatars/application/use-case/create-avatar.usecase";
import { Response } from "express";

@Controller("/avatars")
export class AvatarsController {
    constructor(private readonly createAvatarsUseCase: CreateAvatarUseCase) { }

    @Get("/")
    async retornarAvatar(@Query() query: RetornarAvatarDTO, @Res() res: Response) {
        try {
            const imagemBuffer = await this.createAvatarsUseCase.execute(query)

            res.set({
                'Content-Type': 'image/png',
                'Content-Length': imagemBuffer.length,
                'Cache-Control': 'public, max-age=864000',
            })

            return res.status(HttpStatus.OK).send(imagemBuffer)
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err.message || 'Erro ao gerar avatar 💔',
            })
        }
    }
}