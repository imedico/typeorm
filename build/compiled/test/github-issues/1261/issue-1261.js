"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Bar_1 = require("./entity/Bar");
describe("github issues > #1261 onDelete property on foreign key is not modified on sync", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should modify onDelete property on foreign key on sync", () => Promise.all(connections.map(async (connection) => {
        // Spanner support only NO ACTION clause
        if (connection.driver.options.type === "spanner")
            return;
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("bar");
        table.foreignKeys[0].onDelete.should.be.equal("SET NULL");
        const metadata = connection.getMetadata(Bar_1.Bar);
        metadata.foreignKeys[0].onDelete = "CASCADE";
        await connection.synchronize();
        table = await queryRunner.getTable("bar");
        table.foreignKeys[0].onDelete.should.be.equal("CASCADE");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1261.js.map