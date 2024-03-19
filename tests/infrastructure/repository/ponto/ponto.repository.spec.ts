import { Ponto } from '@/domain/entity/ponto.model';
import { PontoEntity } from '@/infrastructure/entity/ponto.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PontoRepository } from './ponto.repository';

describe('PontoRepository', () => {
    let pontoRepository: PontoRepository;
    let mockPontoEntityRepository: jest.Mocked<Repository<PontoEntity>>;

    beforeEach(async () => {
        mockPontoEntityRepository = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<Repository<PontoEntity>>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PontoRepository,
                {
                    provide: getRepositoryToken(PontoEntity),
                    useValue: mockPontoEntityRepository
                }
            ]
        }).compile();

        pontoRepository = module.get<PontoRepository>(PontoRepository);
    });

    it('deve retornar uma lista de registros de ponto', async () => {
        const pontosEntity = [new PontoEntity(), new PontoEntity()];
        mockPontoEntityRepository.find.mockResolvedValue(pontosEntity);

        const pontos = await pontoRepository.find();

        expect(pontos).toHaveLength(pontosEntity.length);
        expect(mockPontoEntityRepository.find).toHaveBeenCalled();
    });

    it('deve retornar um registro de ponto pelo ID', async () => {
        const pontoEntity = new PontoEntity();
        const pontoId = '123';
        mockPontoEntityRepository.findOneBy.mockResolvedValue(pontoEntity);

        const pedido = await pontoRepository.findById(pontoId);

        expect(pedido).toBeDefined();
        expect(mockPontoEntityRepository.findOneBy).toHaveBeenCalledWith({ id: pontoId });
    });

    it('deve registrar uma marcação de ponto', async () => {
        const ponto = new Ponto();
        const pontoSalvo = new PontoEntity();
        mockPontoEntityRepository.save.mockResolvedValue(pontoSalvo);

        const resultado = await pontoRepository.save(ponto);

        expect(resultado).toEqual(pontoSalvo);
        expect(mockPontoEntityRepository.save).toHaveBeenCalledWith(ponto);
    });

    it('deve remover um registro pelo ID', async () => {
        const pontoId = '123';
        const deleteResultMock: DeleteResult = {
            affected: 1,
            raw: {}
        };
        mockPontoEntityRepository.delete.mockResolvedValue(deleteResultMock);

        await pontoRepository.removeById(pontoId);

        expect(mockPontoEntityRepository.delete).toHaveBeenCalledWith(pontoId);
    });
});
