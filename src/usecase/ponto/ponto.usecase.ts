import { mapper } from '@/application/mapper/base.mapper';
import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { Ponto } from '@/domain/entity/ponto.model';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { RegistroPontoOutput } from '@/infrastructure/dto/ponto/registroPonto.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PontoUseCase implements IPontoUseCase {
    constructor(private _pontoRepository: IPontoRepository) {}

    async marcarPonto(input: MarcarPontoInput, matricula: string): Promise<MarcarPontoOutput> {
        console.log('Entrou:', input, matricula);
        const ponto: Ponto = mapper.map(input, MarcarPontoInput, Ponto);
        ponto.matricula = matricula;

        const pontoSalvo = await this._pontoRepository.save(ponto);
        return mapper.map(pontoSalvo, Ponto, MarcarPontoOutput);
    }

    async obterRegistrosPorMes(mes: number, matricula: string): Promise<RegistroPontoOutput[]> {
        const registros = await this._pontoRepository.findByMonth(mes, matricula);

        const resultado = new RegistroPontoOutput();

        return [resultado];
    }
}
