import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';

export abstract class IPontoUseCase {
    abstract marcarPonto(input: MarcarPontoInput, matricula: string): Promise<MarcarPontoOutput>;
}
