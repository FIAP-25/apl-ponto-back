import { mapper } from '@/application/mapper/base.mapper';
import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { Ponto } from '@/domain/entity/ponto.model';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { RegistroDetalhesOutput, RegistroPontoOutput } from '@/infrastructure/dto/ponto/registroPonto.dto';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class PontoUseCase implements IPontoUseCase {
    constructor(private _pontoRepository: IPontoRepository) {}

    async marcarPonto(input: MarcarPontoInput, matricula: string): Promise<MarcarPontoOutput> {
        const ponto: Ponto = mapper.map(input, MarcarPontoInput, Ponto);
        ponto.matricula = matricula;

        const pontoSalvo = await this._pontoRepository.save(ponto);
        return mapper.map(pontoSalvo, Ponto, MarcarPontoOutput);
    }

    async obterRegistrosPorMes(mes: number, ano: number, matricula: string): Promise<RegistroPontoOutput[]> {
        const diaInicial = 1;
        const diaFinal = dayjs().month(mes).endOf('month').date();

        const resultado: RegistroPontoOutput[] = [];

        for (let i = diaInicial; i <= diaFinal; i++) {
            const dados = {
                data: dayjs().date(i).month(mes).year(ano).toDate(),
                registros: mapper.mapArray(await this._pontoRepository.findByDate(i, mes, ano, matricula), Ponto, RegistroDetalhesOutput)
            };

            resultado.push(dados);
        }

        return resultado;
    }
}
