import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { RegistroPontoOutput } from '@/infrastructure/dto/ponto/registroPonto.dto';

export abstract class IPontoUseCase {
    abstract marcarPonto(input: MarcarPontoInput, matricula: string): Promise<MarcarPontoOutput>;
    abstract obterEspelhoPorMesEAno(mes: number, ano: number, matricula: string): Promise<RegistroPontoOutput[]>;
}
