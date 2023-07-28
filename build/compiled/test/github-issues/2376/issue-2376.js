"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #2376 Naming single column unique constraint with decorator not working as expected", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        schemaCreate: true,
        dropSchema: true,
        entities: [User_1.User],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should keep user-specified Unique constraint name", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("user");
        await queryRunner.release();
        let unique1 = table.uniques.find((it) => it.name === "unique-email");
        let unique2 = table.uniques.find((it) => it.name === "unique-email-nickname");
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "spanner") {
            unique1 = table.indices.find((it) => it.name === "unique-email");
            unique2 = table.indices.find((it) => it.name === "unique-email-nickname");
        }
        (0, chai_1.expect)(unique1).to.be.not.undefined;
        (0, chai_1.expect)(unique2).to.be.not.undefined;
    })));
});
//# sourceMappingURL=issue-2376.js.map