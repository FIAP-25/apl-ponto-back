import { IPontoUseCase } from '@/domain/contract/usecase/ponto.interface';
import { MarcarPontoInput, MarcarPontoOutput } from '@/infrastructure/dto/ponto/marcarPonto.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { PontoController } from './ponto.controller';

describe('PontoController', () => {
    let controller: PontoController;
    let mockPontoUseCase: jest.Mocked<IPontoUseCase>;

    beforeEach(async () => {
        mockPontoUseCase = {
            marcarPonto: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PontoController],
            providers: [{ provide: IPontoUseCase, useValue: mockPontoUseCase }]
        }).compile();

        controller = module.get<PontoController>(PontoController);
    });

    it('deve registrar uma marcação de ponto', async () => {
        const input: MarcarPontoInput = new MarcarPontoInput();
        const expectedOutput: MarcarPontoOutput = {
            id: 'sddf54das5',
            protocolo: '123',
            matricula: '441898',
            latitude: 0,
            longitude: 0,
            dataRegistro: new Date()
        };
        mockPontoUseCase.marcarPonto.mockResolvedValue(expectedOutput);

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await controller.cadastrarProducao(input, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ id: expectedOutput.protocolo });
        expect(mockPontoUseCase.marcarPonto).toHaveBeenCalledWith(input);
    });
});
