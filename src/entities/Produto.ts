import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class Produto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({ nullable: true })
    descricao!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    preco!: number;

    @Column()
    quantidade!: number;

    @Column()
    dataCriacao!: Date;

    @Column()
    dataAtualizacao!: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
    @JoinColumn({ name: "categoriaId" })
    categoria!: Categoria;

    @Column()
    categoriaId!: number;
}