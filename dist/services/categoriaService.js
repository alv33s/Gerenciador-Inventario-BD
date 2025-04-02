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
exports.CategoriaService = void 0;
const Categoria_1 = require("../entities/Categoria");
const Produto_1 = require("../entities/Produto");
const data_source_1 = require("../database/data-source");
class CategoriaService {
    constructor() {
        this.categoriaRepository = data_source_1.AppDataSource.getRepository(Categoria_1.Categoria);
        this.produtoRepository = data_source_1.AppDataSource.getRepository(Produto_1.Produto);
    }
    criarCategoria(nome, descricao, dataCriacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = this.categoriaRepository.create({ nome, descricao, dataCriacao });
            return this.categoriaRepository.save(categoria);
        });
    }
    listarCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoriaRepository.find();
        });
    }
    buscarCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoriaRepository.findOneBy({ id });
        });
    }
    atualizarCategoria(id, nome, descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this.categoriaRepository.findOneBy({ id });
            if (!categoria)
                return false;
            if (nome)
                categoria.nome = nome;
            if (descricao)
                categoria.descricao = descricao;
            yield this.categoriaRepository.save(categoria);
            return true;
        });
    }
    removerCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const produtosVinculados = yield this.produtoRepository.find({ where: { categoriaId: id } });
            if (produtosVinculados.length > 0) {
                throw new Error("Não é possível remover uma categoria com produtos vinculados.");
            }
            const resultado = yield this.categoriaRepository.delete(id);
            return resultado.affected ? true : false;
        });
    }
}
exports.CategoriaService = CategoriaService;
