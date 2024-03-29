import { AutoMap } from '@automapper/classes';

export class RegistroPontoOutput {
    @AutoMap()
    data: Date;

    @AutoMap()
    registros: any[];
}

export class RegistroDetalhesOutput {
    @AutoMap()
    id: string;

    @AutoMap()
    protocolo: string;

    @AutoMap()
    matricula: string;

    @AutoMap()
    latitude: number;

    @AutoMap()
    longitude: number;

    @AutoMap()
    dataRegistro: Date;

    @AutoMap()
    tipoMarcacao: 'Entrada' | 'Saida';
}
