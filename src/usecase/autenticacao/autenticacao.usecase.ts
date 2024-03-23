import { IAutenticacaoUseCase } from '@/domain/contract/usecase/autenticacao.interface';
import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { AutenticarInput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoUseCase implements IAutenticacaoUseCase {
    constructor(private _jwtService: JwtService) {}
    async autenticarUsuario(input: AutenticarInput): Promise<Autenticacao> {
        const payload = { matricula: input.matricula };
        return { token: await this._jwtService.signAsync(payload) };
    }
}
