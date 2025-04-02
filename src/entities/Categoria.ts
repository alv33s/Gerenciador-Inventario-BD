import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Categoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({ nullable: true })
    descricao!: string;

    @Column()
    dataCriacao!: Date;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos!: Produto[];
}