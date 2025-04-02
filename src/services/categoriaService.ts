import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { AppDataSource } from "../database/data-source";

export class CategoriaService {
    private categoriaRepository = AppDataSource.getRepository(Categoria);
    private produtoRepository = AppDataSource.getRepository(Produto);

    async criarCategoria(nome: string, descricao: string, dataCriacao: Date): Promise<Categoria> {
        const categoria = this.categoriaRepository.create({ nome, descricao, dataCriacao });
        return this.categoriaRepository.save(categoria);
    }

    async listarCategorias(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    async buscarCategoria(id: number): Promise<Categoria | null> {
        return this.categoriaRepository.findOneBy({ id });
    }

    async atualizarCategoria(id: number, nome?: string, descricao?: string): Promise<boolean> {
        const categoria = await this.categoriaRepository.findOneBy({ id });
        if (!categoria) return false;

        if (nome) categoria.nome = nome;
        if (descricao) categoria.descricao = descricao;

        await this.categoriaRepository.save(categoria);
        return true;
    }

    async removerCategoria(id: number): Promise<boolean> {
        const produtosVinculados = await this.produtoRepository.find({ where: { categoriaId: id } });
        if (produtosVinculados.length > 0) {
            throw new Error("Não é possível remover uma categoria com produtos vinculados.");
        }
        const resultado = await this.categoriaRepository.delete(id);
        return resultado.affected ? true : false;
    }
}