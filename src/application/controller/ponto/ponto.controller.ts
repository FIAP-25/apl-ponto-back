import { noContent, ok } from '@/application/helper/http.helper';
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

    // @UseGuards(AutenticacaoGuard)
    @EventPattern('ponto_created')
    @Post('registrar')
    @ApiOperation({ summary: 'Registra uma marcação de ponto' })
    async cadastrarProducao(@Body() body: MarcarPontoInput, @Res() res: Response): Promise<any> {
        console.log(body);
        const registroPonto = await this.pontoUseCase.marcarPonto(body);
        return noContent(res);
    }
}
