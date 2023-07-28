"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #8936 DropIndex with a TableIndex without name is not working", () => {
    let connections;
    const tableIndex = new src_1.TableIndex({
        columnNames: ["firstName", "lastName"],
        isUnique: true,
    });
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should drop the index as expected", () => {
        // Create a clone because the createIndex will set the name
        const dropTableIndex = tableIndex.clone();
        return Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const userRepository = connection.getRepository(User_1.User);
            const tableName = userRepository.metadata.tableName;
            // Create the index so it exists when we delete it
            await queryRunner.createIndex(tableName, tableIndex);
            // Drop the index expecting it not to raise QueryFailed
            await queryRunner
                .dropIndex(tableName, dropTableIndex)
                .should.not.be.rejectedWith(src_1.QueryFailedError);
            await queryRunner.release();
        }));
    });
});
//# sourceMappingURL=issue-8936.js.map