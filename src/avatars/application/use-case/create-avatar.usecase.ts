import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ColorAvatarVO } from 'src/avatars/domain/vo/color';
import { InitialNameVO } from 'src/avatars/domain/vo/initialName';
import { RetornarAvatarDTO } from 'src/avatars/interfaces/http/dto/avatarsDTO';

@Injectable()
export class CreateAvatarUseCase {
  constructor() { }

  async execute(query: RetornarAvatarDTO) {
    try {
      const nome = new InitialNameVO(query.nome);
      const cor_imagem = new ColorAvatarVO(query.cor_imagem);
      const cor_fonte = new ColorAvatarVO(query.cor_conte);

      // Lê a fonte e converte para Base64
      const fontPath = path.join(process.cwd(), 'src', 'fonts', 'OpenSans-VariableFont_wdth,wght.ttf');
      const fontData = fs.readFileSync(fontPath).toString('base64');


      const svg = `
        <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
          <style>
            @font-face {
              font-family: 'Open Sans';
              src: url(data:font/ttf;base64,${fontData}) format('truetype');
              font-weight: 600;
            }
            text {
              font-family: 'Open Sans', sans-serif;
              font-weight: 600;
            }
          </style>
          <rect width="100%" height="100%" fill="${cor_imagem.value}" />
          <text x="50%" y="50%" font-size="48" fill="${cor_fonte.value}"
                dominant-baseline="middle" text-anchor="middle">
            ${nome.value}
          </text>
        </svg>
      `;

      const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
      return pngBuffer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ocorreu um erro ao processar a solicitação');
    }
  }
}
