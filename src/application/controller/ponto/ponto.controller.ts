import { AutenticacaoGuard } from '@/application/guard/autenticacao.guard';
import { ok, unauthorized } from '@/application/helper/http.helper';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Ponto Eletrônico')
@Controller('api/ponto-eletronico')
export class PontoController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @UseGuards(AutenticacaoGuard)
    @Post('registrar')
    @ApiOperation({ summary: 'Registra uma marcação de ponto' })
    async registrarPonto(@Body() body: MarcarPontoInput, @Res() res: Response, @Req() req: Request): Promise<any> {
        const matricula = req.matricula;

        if (matricula) {
            const registroPonto = await this.pontoUseCase.marcarPonto(body, matricula);
            return ok(registroPonto, res);
        }
        return unauthorized(res);
    }
}
