"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const Produto_1 = require("../entities/Produto");
const Categoria_1 = require("../entities/Categoria");
const data_source_1 = require("../database/data-source");
class ProdutoService {
    constructor() {
        this.produtoRepository = data_source_1.AppDataSource.getRepository(Produto_1.Produto);
        this.categoriaRepository = data_source_1.AppDataSource.getRepository(Categoria_1.Categoria);
    }
    criarProduto(categoriaId, nome, descricao, preco, quantidade, dataCriacao, dataAtualizacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this.categoriaRepository.findOneBy({ id: categoriaId });
            if (!categoria) {
                throw new Error("Categoria não encontrada.");
            }
            const produto = this.produtoRepository.create({ categoriaId, nome, descricao, preco, quantidade, dataCriacao, dataAtualizacao });
            return this.produtoRepository.save(produto);
        });
    }
    listarProdutos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.produtoRepository.find();
        });
    }
    buscarProduto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.produtoRepository.findOneBy({ id });
        });
    }
    atualizarProduto(id, categoriaId, nome, descricao, preco, quantidade, dataAtualizacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const produto = yield this.produtoRepository.findOneBy({ id });
            if (!produto)
                return false;
            if (categoriaId)
                produto.categoriaId = categoriaId;
            if (nome)
                produto.nome = nome;
            if (descricao)
                produto.descricao = descricao;
            if (preco)
                produto.preco = preco;
            if (quantidade)
                produto.quantidade = quantidade;
            if (dataAtualizacao)
                produto.dataAtualizacao = dataAtualizacao;
            yield this.produtoRepository.save(produto);
            return true;
        });
    }
    removerProduto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield this.produtoRepository.delete(id);
            return resultado.affected ? true : false;
        });
    }
}
exports.ProdutoService = ProdutoService;
