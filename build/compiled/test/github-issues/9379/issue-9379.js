"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const SuperLongTableName_1 = require("./entity/SuperLongTableName");
const SuperLongTableNameIsRelatedToOriginal_1 = require("./entity/SuperLongTableNameIsRelatedToOriginal");
describe("github issues > #9379 RelationIdLoader is not respecting maxAliasLength", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should fetch related entities properly", async () => {
        for (const connection of connections) {
            const origin = await connection
                .getRepository(SuperLongTableName_1.SuperLongTableName)
                .save({ name: "test" });
            await connection
                .getRepository(SuperLongTableNameIsRelatedToOriginal_1.SuperLongTableNameWhichIsRelatedToOriginalTable)
                .save({
                superLongTableNameId: origin.id,
            });
            const result = await connection
                .getRepository(SuperLongTableName_1.SuperLongTableName)
                .findOne({
                where: { id: origin.id },
                relations: { relatedToOriginal: true },
                relationLoadStrategy: "query",
            });
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.relatedToOriginal.length).to.eq(1);
        }
    });
});
//# sourceMappingURL=issue-9379.js.map