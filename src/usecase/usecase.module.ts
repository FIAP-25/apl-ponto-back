import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import InfrastructureModule from '@/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { PontoUseCase } from './ponto/ponto.usecase';
import { IAutenticacaoUseCase } from '@/domain/contract/usecase/autenticacao.interface';
import { AutenticacaoUseCase } from './autenticacao/autenticacao.usecase';

@Module({
    imports: [InfrastructureModule],
    providers: [
        { provide: IAutenticacaoUseCase, useClass: AutenticacaoUseCase },
        { provide: IPontoUseCase, useClass: PontoUseCase }
    ],
    exports: [IPontoUseCase, IAutenticacaoUseCase]
})
export default class UseCaseModule {}
