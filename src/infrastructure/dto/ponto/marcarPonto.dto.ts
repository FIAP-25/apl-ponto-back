import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class MarcarPontoInput {
    @AutoMap()
    @ApiProperty({ required: true })
    latitude: number;

    @AutoMap()
    @ApiProperty({ required: true })
    longitude: number;
}

export class MarcarPontoOutput {
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
}
