"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const first_1 = tslib_1.__importDefault(require("./entity/first"));
const second_1 = tslib_1.__importDefault(require("./entity/second"));
describe("github issues > #4958 getRepository returns results from another Repo", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [first_1.default, second_1.default],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("sql generated is for correct model", () => Promise.all(connections.map(async (connection) => {
        const rawSql = await connection
            .getRepository(second_1.default)
            .createQueryBuilder("a")
            .getSql();
        (0, chai_1.expect)(rawSql).to.be.equal('SELECT "a"."notId" AS "a_notId" FROM "second" "a"');
    })));
});
//# sourceMappingURL=issue-4958.js.map