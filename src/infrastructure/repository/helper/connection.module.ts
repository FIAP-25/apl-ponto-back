import { PontoEntity } from '@/infrastructure/entity/ponto.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            // url: 'mongodb://root:example@127.0.0.1:27018/fiap?authSource=admin',
            type: 'mongodb',
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_SCHEMA,
            authSource: process.env.DATABASE_AUTHSOURCE,
            port: Number(process.env.DATABASE_PORT),
            entities: [PontoEntity],
            synchronize: true
        })
    ]
})
export class ConnectionModule {}
