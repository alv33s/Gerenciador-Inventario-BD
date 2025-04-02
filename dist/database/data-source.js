"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Categoria_1 = require("../entities/Categoria");
const Produto_1 = require("../entities/Produto");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "25097800",
    database: "inventario",
    synchronize: true,
    logging: false,
    entities: [Categoria_1.Categoria, Produto_1.Produto],
    migrations: [],
    subscribers: [],
});
