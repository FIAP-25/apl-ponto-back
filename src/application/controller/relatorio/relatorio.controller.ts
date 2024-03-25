import { ok } from '@/application/helper/http.helper';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

@ApiTags('Relatórios')
@Controller('api/relatorios')
export class RelatorioController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @Get('registros/:matricula/espelho/:ano/:mes')
    @ApiOperation({ summary: 'Ontém o espelho do ponto de um determinado mês' })
    async obterEspelhoPonto(@Param('matricula') matricula: string, @Param('mes') mes: number, @Param('ano') ano: number, @Res() res: Response): Promise<any> {
        const espelho = await this.pontoUseCase.obterEspelhoPorMesEAno(mes, ano, matricula);
        return ok(espelho, res);
    }
}
