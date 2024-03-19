import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PontoUseCase implements IPontoUseCase {
    async marcarPonto(input: MarcarPontoInput): Promise<MarcarPontoOutput> {
        throw new Error('Method not implemented.');
    }
}
