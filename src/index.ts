import { AppDataSource } from "./database/data-source";
import { mostrarMenu } from "./cli/menu";

async function iniciarAplicacao() {
    try {
        await AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        await mostrarMenu();
    } catch (erro) {
        console.error("Erro ao inicializar a aplicação:", erro);
    }
}

iniciarAplicacao();