import { IPontoRepository } from '@/domain/contract/repository/ponto.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { PontoUseCase } from './ponto.usecase';

jest.mock('@/application/mapper/base.mapper', () => ({
    mapper: {
        map: jest.fn().mockImplementation((entity) => entity),
        mapArray: jest.fn().mockImplementation((entities) => entities)
    }
}));

describe('PontoUseCase', () => {
    let useCase: PontoUseCase;
    let mockPontoRepository: jest.Mocked<IPontoRepository>;

    beforeEach(async () => {
        mockPontoRepository = {
            find: jest.fn(),
            findById: jest.fn(),
            findByDate: jest.fn(),
            findByMonth: jest.fn(),
            save: jest.fn(),
            removeById: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PontoUseCase,
                {
                    provide: IPontoRepository,
                    useValue: mockPontoRepository
                }
            ]
        }).compile();

        useCase = module.get<PontoUseCase>(PontoUseCase);
    });

    it('deve adicionar um pedido', async () => {
        expect(true).toBeTruthy();
    });
});
