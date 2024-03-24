import { Ponto } from '@/domain/entity/ponto.model';

export abstract class IPontoRepository {
    abstract find(): Promise<Ponto[]>;
    abstract findById(id: string): Promise<Ponto>;
    abstract findByDate(data: Date, matricula: string): Promise<Ponto[]>;
    abstract findByMonth(mes: number, matricula: string): Promise<Ponto[]>;
    abstract save(ponto: Ponto): Promise<Ponto>;
    abstract removeById(id: string): Promise<void>;
}
