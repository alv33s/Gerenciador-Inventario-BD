import { Produto } from "../entities/Produto";
import { Categoria } from "../entities/Categoria";
import { AppDataSource } from "../database/data-source";

export class ProdutoService {
    private produtoRepository = AppDataSource.getRepository(Produto);
    private categoriaRepository = AppDataSource.getRepository(Categoria);

    async criarProduto(categoriaId: number, nome: string, descricao: string, preco: number, quantidade: number, dataCriacao: Date, dataAtualizacao: Date): Promise<Produto> {
        const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });
        if (!categoria) {
            throw new Error("Categoria não encontrada.");
        }
        const produto = this.produtoRepository.create({ categoriaId, nome, descricao, preco, quantidade, dataCriacao, dataAtualizacao });
        return this.produtoRepository.save(produto);
    }

    async listarProdutos(): Promise<Produto[]> {
        return this.produtoRepository.find();
    }

    async buscarProduto(id: number): Promise<Produto | null> {
        return this.produtoRepository.findOneBy({ id });
    }

    async atualizarProduto(id: number, categoriaId?: number, nome?: string, descricao?: string, preco?: number, quantidade?: number, dataAtualizacao?: Date): Promise<boolean> {
        const produto = await this.produtoRepository.findOneBy({ id });
        if (!produto) return false;

        if (categoriaId) produto.categoriaId = categoriaId;
        if (nome) produto.nome = nome;
        if (descricao) produto.descricao = descricao;
        if (preco) produto.preco = preco;
        if (quantidade) produto.quantidade = quantidade;
        if (dataAtualizacao) produto.dataAtualizacao = dataAtualizacao;

        await this.produtoRepository.save(produto);
        return true;
    }

    async removerProduto(id: number): Promise<boolean> {
        const resultado = await this.produtoRepository.delete(id);
        return resultado.affected ? true : false;
    }
}