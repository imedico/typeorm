"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Test_1 = require("./entity/Test");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
describe("github issues > #9152 Can't use LessThan for Union field", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not raise TypeScript error when LessThan with Union is passed to FindOptionsWhere", () => Promise.all(connections.map(async (connection) => {
        await connection.getRepository(Test_1.Test).save({
            value: 1,
        });
        const value = 2;
        const count = await connection.getRepository(Test_1.Test).countBy({
            value: (0, src_1.LessThan)(value),
        });
        (0, chai_1.expect)(count).to.eq(1);
    })));
});
//# sourceMappingURL=issue-9152.js.map