import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Relatórios')
@Controller('api/relatorios')
export class RelatorioController {
    constructor(private pontoUseCase: IPontoUseCase) {}

    @Get('registros/espelho/:ano/:mes')
    @ApiOperation({ summary: 'Ontém o espelho do ponto de um determinado mês' })
    async obterEspelhoPonto(@Param('mes') mes: number, @Param('ano') ano: number, @Res() res: Response): Promise<any> {
        const registroPonto = await this.pontoUseCase.obterRegistrosPorMes(mes, ano, '441898');
        return registroPonto;
    }
}
