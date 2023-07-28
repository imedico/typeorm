"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #736 ClosureEntity should set (composite) primary/unique key in the closure table", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create composite primary key on closure ancestor and descendant", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("category_closure");
        table.findColumnByName("id_ancestor").isPrimary.should.be.true;
        table.findColumnByName("id_descendant").isPrimary.should.be
            .true;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-736.js.map