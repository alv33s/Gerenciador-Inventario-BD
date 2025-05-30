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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarMenu = mostrarMenu;
const inquirer_1 = __importDefault(require("inquirer"));
const categoriaService_1 = require("../services/categoriaService");
const produtoService_1 = require("../services/produtoService");
const categoriaService = new categoriaService_1.CategoriaService();
const produtoService = new produtoService_1.ProdutoService();
// Função principal do menu
function mostrarMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const escolha = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: [
                    'Gerenciar Categorias',
                    'Gerenciar Produtos',
                    'Sair'
                ]
            });
            switch (escolha.opcao) {
                case 'Gerenciar Categorias':
                    yield gerenciarCategorias();
                    break;
                case 'Gerenciar Produtos':
                    yield gerenciarProdutos();
                    break;
                case 'Sair':
                    console.log('Saindo...');
                    process.exit();
            }
        }
    });
}
// Gerenciamento de Categorias
function gerenciarCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const escolha = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção para categorias:',
                choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar']
            });
            switch (escolha.opcao) {
                case 'Criar':
                    const novaCategoria = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'nome', message: 'Nome da categoria:' },
                        { type: 'input', name: 'descricao', message: 'Descrição da categoria:' }
                    ]);
                    yield categoriaService.criarCategoria(novaCategoria.nome, novaCategoria.descricao, new Date());
                    console.log('Categoria criada com sucesso!');
                    break;
                case 'Listar':
                    const categorias = yield categoriaService.listarCategorias();
                    console.table(categorias);
                    break;
                case 'Buscar':
                    const buscarId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                    const categoria = yield categoriaService.buscarCategoria(parseInt(buscarId.id));
                    console.log(categoria || 'Categoria não encontrada');
                    break;
                case 'Atualizar':
                    const atualizarId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                    const atualizarDados = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'nome', message: 'Novo nome da categoria:', default: '' },
                        { type: 'input', name: 'descricao', message: 'Nova descrição:', default: '' }
                    ]);
                    yield categoriaService.atualizarCategoria(parseInt(atualizarId.id), atualizarDados.nome, atualizarDados.descricao);
                    console.log('Categoria atualizada!');
                    break;
                case 'Remover':
                    const removerId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                    try {
                        yield categoriaService.removerCategoria(parseInt(removerId.id));
                        console.log('Categoria removida!');
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                    break;
                case 'Voltar':
                    return;
            }
        }
    });
}
// Gerenciamento de Produtos
function gerenciarProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const escolha = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção para produtos:',
                choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar']
            });
            switch (escolha.opcao) {
                case 'Criar':
                    const novoProduto = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'categoriaId', message: 'ID da categoria do produto:' },
                        { type: 'input', name: 'nome', message: 'Nome do produto:' },
                        { type: 'input', name: 'descricao', message: 'Descrição do produto:' },
                        { type: 'input', name: 'preco', message: 'Preço do produto:' },
                        { type: 'input', name: 'quantidade', message: 'Quantidade do produto:' }
                    ]);
                    yield produtoService.criarProduto(parseInt(novoProduto.categoriaId), novoProduto.nome, novoProduto.descricao, parseFloat(novoProduto.preco), parseInt(novoProduto.quantidade), new Date(), new Date());
                    console.log('Produto criado com sucesso!');
                    break;
                case 'Listar':
                    const produtos = yield produtoService.listarProdutos();
                    console.table(produtos);
                    break;
                case 'Buscar':
                    const buscarProdutoId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                    const produto = yield produtoService.buscarProduto(parseInt(buscarProdutoId.id));
                    console.log(produto || 'Produto não encontrado');
                    break;
                case 'Atualizar':
                    const atualizarProdutoId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                    const atualizarProdutoDados = yield inquirer_1.default.prompt([
                        { type: 'input', name: 'categoriaId', message: 'Novo ID da categoria do produto:', default: undefined },
                        { type: 'input', name: 'nome', message: 'Novo nome do produto:', default: '' },
                        { type: 'input', name: 'descricao', message: 'Nova descrição:', default: '' },
                        { type: 'input', name: 'preco', message: 'Novo preço:', default: undefined },
                        { type: 'input', name: 'quantidade', message: 'Nova quantidade:', default: undefined }
                    ]);
                    yield produtoService.atualizarProduto(parseInt(atualizarProdutoId.id), atualizarProdutoDados.categoriaId ? parseInt(atualizarProdutoDados.categoriaId) : undefined, atualizarProdutoDados.nome, atualizarProdutoDados.descricao, atualizarProdutoDados.preco ? parseFloat(atualizarProdutoDados.preco) : undefined, atualizarProdutoDados.quantidade ? parseInt(atualizarProdutoDados.quantidade) : undefined, new Date());
                    console.log('Produto atualizado com sucesso!');
                    break;
                case 'Remover':
                    const removerProdutoId = yield inquirer_1.default.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                    yield produtoService.removerProduto(parseInt(removerProdutoId.id));
                    console.log('Produto removido com sucesso!');
                    break;
                case 'Voltar':
                    return;
            }
        }
    });
}
