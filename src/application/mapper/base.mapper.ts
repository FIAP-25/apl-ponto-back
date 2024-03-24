import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { Ponto } from '@/domain/entity/ponto.model';
import { AutenticarOutput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { PontoEntity } from '@/infrastructure/entity/ponto.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom, typeConverter } from '@automapper/core';

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
        (destination) => destination.dataRegistro,
        mapFrom(() => new Date())
    )
);

createMap(
    mapper,
    PontoEntity,
    Ponto,
    forMember(
        (destination) => destination._id,
        mapFrom((source) => String(source._id))
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
// #endregion
