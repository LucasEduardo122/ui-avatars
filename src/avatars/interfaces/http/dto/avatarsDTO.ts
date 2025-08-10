import {IsBoolean, IsNotEmpty, IsOptional, IsString, Max, MaxLength, MinLength} from "class-validator"

export class RetornarAvatarDTO {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(6)
    cor_conte: string

    @IsString()
    @IsOptional()
    tamanho_imagem: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(6)
    cor_imagem: string
}