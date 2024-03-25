import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { Ponto } from '@/domain/entity/ponto.model';
import { AutenticarOutput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { RegistroDetalhesOutput } from '@/infrastructure/dto/ponto/registroPonto.dto';
import { PontoEntity } from '@/infrastructure/entity/ponto.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom, typeConverter } from '@automapper/core';
import dayjs from 'dayjs';

export const mapper = createMapper({
    strategyInitializer: classes()
});

// #region Autenticação
createMap(
    mapper,
    Autenticacao,
    AutenticarOutput,
    forMember(
        (destination) => destination.token,
        mapFrom((source) => source.token)
    )
);

createMap(
    mapper,
    AutenticarOutput,
    Autenticacao,
    forMember(
        (destination) => destination.token,
        mapFrom((source) => source.token)
    )
);
// #endregion

// #region Ponto
createMap(
    mapper,
    MarcarPontoInput,
    Ponto,
    typeConverter(String, Number, (str) => parseInt(str)),
    forMember(
        (destination) => destination.diaRegistro,
        mapFrom(() => dayjs().date())
    ),
    forMember(
        (destination) => destination.mesRegistro,
        mapFrom(() => dayjs().month())
    ),
    forMember(
        (destination) => destination.anoRegistro,
        mapFrom(() => dayjs().year())
    ),
    forMember(
        (destination) => destination.horaRegistro,
        mapFrom(() => dayjs().hour())
    ),
    forMember(
        (destination) => destination.minutoRegistro,
        mapFrom(() => dayjs().minute())
    ),
    forMember(
        (destination) => destination.segundoRegistro,
        mapFrom(() => dayjs().second())
    )
);

createMap(
    mapper,
    PontoEntity,
    Ponto,
    forMember(
        (destination) => destination.matricula,
        mapFrom((source) => String(source.matricula))
    ),
    forMember(
        (destination) => destination.latitude,
        mapFrom((source) => source.latitude)
    ),
    forMember(
        (destination) => destination.longitude,
        mapFrom((source) => source.longitude)
    ),
    forMember(
        (destination) => destination.diaRegistro,
        mapFrom((source) => source.diaRegistro)
    ),
    forMember(
        (destination) => destination.mesRegistro,
        mapFrom((source) => source.mesRegistro)
    ),
    forMember(
        (destination) => destination.anoRegistro,
        mapFrom((source) => source.anoRegistro)
    ),
    forMember(
        (destination) => destination.horaRegistro,
        mapFrom((source) => source.horaRegistro)
    ),
    forMember(
        (destination) => destination.minutoRegistro,
        mapFrom((source) => source.minutoRegistro)
    ),
    forMember(
        (destination) => destination.segundoRegistro,
        mapFrom((source) => source.segundoRegistro)
    )
);

createMap(
    mapper,
    Ponto,
    MarcarPontoOutput,
    forMember(
        (destination) => destination.id,
        mapFrom((source) => source._id)
    )
);

createMap(
    mapper,
    Ponto,
    RegistroDetalhesOutput,
    forMember(
        (destination) => destination.dataRegistro,
        mapFrom((x) => dayjs().date(x.diaRegistro).month(x.mesRegistro).year(x.anoRegistro).hour(x.horaRegistro).minute(x.minutoRegistro).second(x.segundoRegistro).millisecond(0).toDate())
    )
);
// #endregion
