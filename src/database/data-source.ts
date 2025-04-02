import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "25097800",
    database: "inventario",
    synchronize: true,
    logging: false,
    entities: [Categoria, Produto],
    migrations: [],
    subscribers: [],
});