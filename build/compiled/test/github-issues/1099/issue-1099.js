"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
const OffsetWithoutLimitNotSupportedError_1 = require("../../../src/error/OffsetWithoutLimitNotSupportedError");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #1099 BUG - QueryBuilder MySQL skip sql is wrong", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("drivers which does not support offset without limit should throw an exception, other drivers must work fine", () => Promise.all(connections.map(async (connection) => {
        let animals = ["cat", "dog", "bear", "snake"];
        for (let animal of animals) {
            await connection
                .getRepository(Animal_1.Animal)
                .save({ name: animal });
        }
        const qb = connection
            .getRepository(Animal_1.Animal)
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.categories", "categories")
            .orderBy("a.id")
            .skip(1);
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            await qb
                .getManyAndCount()
                .should.be.rejectedWith(OffsetWithoutLimitNotSupportedError_1.OffsetWithoutLimitNotSupportedError);
        }
        else {
            await qb.getManyAndCount().should.eventually.be.eql([
                [
                    { id: 2, name: "dog", categories: [] },
                    { id: 3, name: "bear", categories: [] },
                    { id: 4, name: "snake", categories: [] },
                ],
                4,
            ]);
        }
    })));
});
//# sourceMappingURL=issue-1099.js.map