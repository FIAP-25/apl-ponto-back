/* eslint-disable import/first */
import 'dotenv/config';

import { ExceptionInterceptor } from '@/application/interceptor/exception.interceptor';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerModule } from './server.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const port = process.env.PORT ?? 3000;

async function bootstrap(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
        console.log('[Servidor]: Ambiente Produtivo.');
    } else {
        console.log('[Servidor]: Ambiente Desenvolvimento.');
    }

    const app = await NestFactory.create(ServerModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqps://vjeublcb:5H-qWFm_i9vJ1duE58Ux14obQm8amJp5@moose.rmq.cloudamqp.com/vjeublcb'],
            queue: 'ponto-queue',
            queueOptions: {
                durable: false
            },
            
        },
    });

    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionInterceptor(httpAdapter));

    const config = new DocumentBuilder().setTitle('FIAP - 25 API').setDescription('Documentação API.').setVersion('2.0.0').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.startAllMicroservices();
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
