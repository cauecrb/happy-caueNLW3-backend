import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './image';

@Entity('orfanatos')
export default class Orfanato {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    sobre: string;

    @Column()
    instrucoes: string;

    @Column()
    horas_funcionamento: string;

    @Column()
    aberto_fds: boolean;

    @OneToMany(()=> Image, image => image.orphanage,{
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}