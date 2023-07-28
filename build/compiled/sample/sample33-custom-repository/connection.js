"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sample33CustomRepositoryConnection = void 0;
require("reflect-metadata");
const src_1 = require("../../src");
exports.Sample33CustomRepositoryConnection = new src_1.DataSource({
    type: "sqlite",
    database: "./temp/sqlitedb-1.db",
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=connection.js.map