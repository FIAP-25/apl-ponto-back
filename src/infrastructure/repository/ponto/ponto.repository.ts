import { mapper } from '@/application/mapper/base.mapper';
import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { Ponto } from '@/domain/entity/ponto.model';
import { PontoEntity } from '@/infrastructure/entity/ponto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PontoRepository implements IPontoRepository {
    constructor(
        @InjectRepository(PontoEntity)
        private pontoRepositoy: Repository<PontoEntity>
    ) {}

    async find(): Promise<Ponto[]> {
        const ponto = await this.pontoRepositoy.find();
        return mapper.mapArray(ponto, PontoEntity, Ponto);
    }

    async findById(id: string): Promise<Ponto> {
        const pedido = await this.pontoRepositoy.findOneBy({ id: id });
        return mapper.map(pedido, PontoEntity, Ponto);
    }

    async save(ponto: Ponto): Promise<Ponto> {
        return await this.pontoRepositoy.save(ponto);
    }

    async removeById(id: string): Promise<void> {
        await this.pontoRepositoy.delete(id);
    }
}
