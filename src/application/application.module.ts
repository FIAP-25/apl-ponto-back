import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { BaseController } from './controller/base/base.controller';
import { HeatlhController } from './controller/health/health.controller';
import { RelatorioController } from './controller/relatorio/relatorio.controller';
import { PontoController } from './controller/ponto/ponto.controller';
import { AutenticacaoController } from './controller/autenticacao/autenticacao.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [PontoController, RelatorioController, HeatlhController, BaseController, AutenticacaoController]
})
export default class ApplicationModule {}
