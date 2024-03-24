import { ok, unauthorized } from '@/application/helper/http.helper';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Ponto Eletrônico')
@Controller('api/ponto-eletronico')
export class PontoController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @EventPattern('ponto_created')
    @Post('registrar')
    @ApiOperation({ summary: 'Registra uma marcação de ponto' })
    async registrarPonto(@Body() body: MarcarPontoInput, @Res() res: Response): Promise<any> {
        if (body) {
            const registroPonto = await this.pontoUseCase.marcarPonto(body, body.matricula);
            return ok(registroPonto, res);
        }
        return unauthorized(res);
    }
}
