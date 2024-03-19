import UseCaseModule from '@/usecase/usecase.module';
import { Module } from '@nestjs/common';
import { BaseController } from './controller/base/base.controller';
import { HeatlhController } from './controller/health/health.controller';
import { RelatorioController } from './controller/relatorio/relatorio.controller';
import { PontoController } from './controller/ponto/ponto.controller';

@Module({
    imports: [UseCaseModule],
    controllers: [PontoController, RelatorioController, HeatlhController, BaseController]
})
export default class ApplicationModule {}
