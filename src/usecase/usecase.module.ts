import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { PontoUseCase } from './ponto/ponto.usecase';

@Module({
    imports: [InfrastructureModule],
    providers: [{ provide: IPontoUseCase, useClass: PontoUseCase }],
    exports: [IPontoUseCase]
})
export default class UseCaseModule {}
