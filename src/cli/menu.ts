import inquirer from 'inquirer';
import { CategoriaService } from '../services/categoriaService';
import { ProdutoService } from '../services/produtoService';

const categoriaService = new CategoriaService();
const produtoService = new ProdutoService();

// Função principal do menu
export async function mostrarMenu() {
    while (true) {
        const escolha = await inquirer.prompt({
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
                await gerenciarCategorias();
                break;
            case 'Gerenciar Produtos':
                await gerenciarProdutos();
                break;
            case 'Sair':
                console.log('Saindo...');
                process.exit();
        }
    }
}

// Gerenciamento de Categorias
async function gerenciarCategorias() {
    while (true) {
        const escolha = await inquirer.prompt({
            type: 'list',
            name: 'opcao',
            message: 'Escolha uma opção para categorias:',
            choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar']
        });

        switch (escolha.opcao) {
            case 'Criar':
                const novaCategoria = await inquirer.prompt([
                    { type: 'input', name: 'nome', message: 'Nome da categoria:' },
                    { type: 'input', name: 'descricao', message: 'Descrição da categoria:' }
                ]);
                await categoriaService.criarCategoria(novaCategoria.nome, novaCategoria.descricao, new Date());
                console.log('Categoria criada com sucesso!');
                break;
            case 'Listar':
                const categorias = await categoriaService.listarCategorias();
                console.table(categorias);
                break;
            case 'Buscar':
                const buscarId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                const categoria = await categoriaService.buscarCategoria(parseInt(buscarId.id));
                console.log(categoria || 'Categoria não encontrada');
                break;
            case 'Atualizar':
                const atualizarId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                const atualizarDados = await inquirer.prompt([
                    { type: 'input', name: 'nome', message: 'Novo nome da categoria:', default: '' },
                    { type: 'input', name: 'descricao', message: 'Nova descrição:', default: '' }
                ]);
                await categoriaService.atualizarCategoria(parseInt(atualizarId.id), atualizarDados.nome, atualizarDados.descricao);
                console.log('Categoria atualizada!');
                break;
            case 'Remover':
                const removerId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID da categoria:' });
                try {
                    await categoriaService.removerCategoria(parseInt(removerId.id));
                    console.log('Categoria removida!');
                } catch (error: any) {
                    console.error(error.message);
                }
                break;
            case 'Voltar':
                return;
        }
    }
}

// Gerenciamento de Produtos
async function gerenciarProdutos() {
    while (true) {
        const escolha = await inquirer.prompt({
            type: 'list',
            name: 'opcao',
            message: 'Escolha uma opção para produtos:',
            choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar']
        });

        switch (escolha.opcao) {
            case 'Criar':
                const novoProduto = await inquirer.prompt([
                    { type: 'input', name: 'categoriaId', message: 'ID da categoria do produto:' },
                    { type: 'input', name: 'nome', message: 'Nome do produto:' },
                    { type: 'input', name: 'descricao', message: 'Descrição do produto:' },
                    { type: 'input', name: 'preco', message: 'Preço do produto:' },
                    { type: 'input', name: 'quantidade', message: 'Quantidade do produto:' }
                ]);
                await produtoService.criarProduto(
                    parseInt(novoProduto.categoriaId),
                    novoProduto.nome,
                    novoProduto.descricao,
                    parseFloat(novoProduto.preco),
                    parseInt(novoProduto.quantidade),
                    new Date(),
                    new Date()
                );
                console.log('Produto criado com sucesso!');
                break;
            case 'Listar':
                const produtos = await produtoService.listarProdutos();
                console.table(produtos);
                break;
            case 'Buscar':
                const buscarProdutoId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                const produto = await produtoService.buscarProduto(parseInt(buscarProdutoId.id));
                console.log(produto || 'Produto não encontrado');
                break;
            case 'Atualizar':
                const atualizarProdutoId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                const atualizarProdutoDados = await inquirer.prompt([
                    { type: 'input', name: 'categoriaId', message: 'Novo ID da categoria do produto:', default: undefined },
                    { type: 'input', name: 'nome', message: 'Novo nome do produto:', default: '' },
                    { type: 'input', name: 'descricao', message: 'Nova descrição:', default: '' },
                    { type: 'input', name: 'preco', message: 'Novo preço:', default: undefined },
                    { type: 'input', name: 'quantidade', message: 'Nova quantidade:', default: undefined }
                ]);
                await produtoService.atualizarProduto(
                    parseInt(atualizarProdutoId.id),
                    atualizarProdutoDados.categoriaId ? parseInt(atualizarProdutoDados.categoriaId) : undefined,
                    atualizarProdutoDados.nome,
                    atualizarProdutoDados.descricao,
                    atualizarProdutoDados.preco ? parseFloat(atualizarProdutoDados.preco) : undefined,
                    atualizarProdutoDados.quantidade ? parseInt(atualizarProdutoDados.quantidade) : undefined,
                    new Date()
                );
                console.log('Produto atualizado com sucesso!');
                break;
            case 'Remover':
                const removerProdutoId = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID do produto:' });
                await produtoService.removerProduto(parseInt(removerProdutoId.id));
                console.log('Produto removido com sucesso!');
                break;
            case 'Voltar':
                return;
        }
    }
}