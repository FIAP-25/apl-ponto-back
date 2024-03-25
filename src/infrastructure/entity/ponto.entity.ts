import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn, ObjectId } from 'typeorm';

@Entity('ponto-eletronico')
export class PontoEntity {
    @ObjectIdColumn()
    _id: ObjectId;

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

    @Column()
    diaRegistro: number;

    @Column()
    mesRegistro: number;

    @Column()
    anoRegistro: number;

    @Column()
    horaRegistro: number;

    @Column()
    minutoRegistro: number;

    @Column()
    segundoRegistro: number;

    @CreateDateColumn()
    dataCadastro: Date;

    @UpdateDateColumn()
    dataAtualizacao: Date;
}
