import { Autenticacao } from '@/domain/entity/autenticacao.model';
import { AutenticarOutput } from '@/infrastructure/dto/autenticacao/autenticar.dto';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

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
