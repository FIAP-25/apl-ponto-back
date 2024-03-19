import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('ponto-eletronico')
export class PontoEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    matricula: string;

    @Column({
        type: 'string',
        transformer: {
            to(data: number): number {
                return data;
            },
            from(data: string): string {
                return String(data);
            }
        }
    })
    latitude: string;

    @Column({
        type: 'string',
        transformer: {
            to(data: number): number {
                return data;
            },
            from(data: string): string {
                return String(data);
            }
        }
    })
    longitude: string;

    @CreateDateColumn()
    dataRegistro: Date;

    @CreateDateColumn()
    dataCadastro: Date;

    @UpdateDateColumn()
    dataAtualizacao: Date;
}
