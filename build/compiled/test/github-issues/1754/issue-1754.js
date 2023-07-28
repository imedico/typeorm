"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = require("./entity/cliente");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const tipo_cliente_1 = require("./entity/tipo-cliente");
describe("github issue #1754 Repository.save() always updating ManyToOne relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected", () => Promise.all(connections.map(async (connection) => {
        const tipoCliente1 = new tipo_cliente_1.TipoCliente();
        tipoCliente1.id = 1;
        tipoCliente1.descricao = "Mensalista";
        await connection.manager.save(tipoCliente1);
        const tipoCliente2 = new tipo_cliente_1.TipoCliente();
        tipoCliente2.id = 2;
        tipoCliente2.descricao = "XXXX";
        await connection.manager.save(tipoCliente2);
        const cliente = new cliente_1.Cliente();
        cliente.id = 1;
        cliente.nome = "Kirliam";
        cliente.tipo = tipoCliente1;
        await connection.manager.save(cliente);
        // The issue happens when I receive the cliente JSON from user interface
        // 1. First I tried to call save() after receive the JSON
        let myReceivedJson1 = {
            id: 1,
            nome: "Kirliam changed 1",
            tipo: { id: 1, descricao: "Mensalista" },
        };
        await connection.manager
            .getRepository(cliente_1.Cliente)
            .save(myReceivedJson1);
        // 2. After I tried to preload the entity before saving. I was expecting that just
        // the name column to be updated, but in both cases tipoCliente is also being updated.
        let myReceivedJson2 = {
            id: 1,
            nome: "Kirliam changed 2",
            tipo: { id: 1, descricao: "Mensalista" },
        };
        let clienteDb1 = (await connection.manager
            .getRepository(cliente_1.Cliente)
            .preload(myReceivedJson2));
        await connection.manager.getRepository(cliente_1.Cliente).save(clienteDb1);
        let myReceivedJson3 = {
            id: 1,
            nome: "Kirliam changed 3",
            tipo: { id: 2, descricao: "XXXX" },
        };
        await connection.manager
            .getRepository(cliente_1.Cliente)
            .save(myReceivedJson3);
        // Fail just to check the query log!
        // Query from log:  UPDATE `cliente` SET `nome`=?, `tipoCliente`=?  WHERE `id`=? -- PARAMETERS: ["Kirliam changed 2",1,1]
        // expect(false, "Verificar as queries!!!").is.true;
    })));
});
//# sourceMappingURL=issue-1754.js.map