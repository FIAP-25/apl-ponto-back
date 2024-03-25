import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class Ponto {
    @AutoMap()
    _id: string;

    @AutoMap()
    @ApiProperty({ required: true })
    matricula: string;

    @AutoMap()
    @ApiProperty({ required: true })
    latitude: string;

    @AutoMap()
    @ApiProperty({ required: true })
    longitude: string;

    @AutoMap()
    @ApiProperty({ required: true })
    diaRegistro: number;

    @AutoMap()
    @ApiProperty({ required: true })
    mesRegistro: number;

    @AutoMap()
    @ApiProperty({ required: true })
    anoRegistro: number;

    @AutoMap()
    @ApiProperty({ required: true })
    horaRegistro: number;

    @AutoMap()
    @ApiProperty({ required: true })
    minutoRegistro: number;

    @AutoMap()
    @ApiProperty({ required: true })
    segundoRegistro: number;
}
