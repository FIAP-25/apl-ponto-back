import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoEntity } from './entity/ponto.entity';
import { ConnectionModule } from './repository/helper/connection.module';
import { PontoRepository } from './repository/ponto/ponto.repository';
@Module({
    imports: [TypeOrmModule.forFeature([PontoEntity]), ConnectionModule],
    providers: [{ provide: IPontoRepository, useClass: PontoRepository }],
    exports: [IPontoRepository, ConnectionModule]
})
export default class InfrastructureModule {}
