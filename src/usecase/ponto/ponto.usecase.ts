import { mapper } from '@/application/mapper/base.mapper';
import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { Ponto } from '@/domain/entity/ponto.model';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { RegistroPontoOutput } from '@/infrastructure/dto/ponto/registroPonto.dto';
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

    async obterEspelhoPorMesEAno(mes: number, ano: number, matricula: string): Promise<RegistroPontoOutput[]> {
        const diaInicial = 1;
        const diaFinal = dayjs()
            .month(mes - 1)
            .endOf('month')
            .date();

        const resultado: RegistroPontoOutput[] = [];

        for (let i = diaInicial; i <= diaFinal; i++) {
            const dados = {
                data: dayjs()
                    .date(i)
                    .month(mes - 1)
                    .year(ano)
                    .hour(0)
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toDate(),
                registros: (await this._pontoRepository.find())
                    .filter((x) => Number(x.diaRegistro) === Number(i) && Number(x.mesRegistro) === Number(mes) && Number(x.anoRegistro) === Number(ano) && x.matricula === matricula)
                    .map((y, indice) => {
                        return { ...y, tipoMarcacao: indice % 2 === 0 ? 'Entrada' : 'Saida' };
                    })
            };

            resultado.push(dados);
        }

        return resultado;
    }
}
